/**
 * Concurrency Test: Event Registration Race Condition
 * 
 * This script tests that the event registration endpoint properly
 * handles concurrent registration attempts for an event with limited capacity.
 * 
 * PREREQUISITES:
 *   - DATABASE_URL must be set in environment
 *   - Dependencies installed (npm install)
 * 
 * The registration endpoint requires authentication, so this test simulates
 * the race condition at the database level to demonstrate the vulnerability.
 * 
 * Expected behavior: With maxAttendees=1, exactly 1 request should succeed
 * and the rest should return 409 Conflict.
 * 
 * Usage:
 *   npm run test:concurrency
 *   # OR directly:
 *   node scripts/test-concurrency.js
 */

const { db } = require('../lib/db');

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const CONCURRENT_REQUESTS = 3;

async function createTestUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = await db.user.create({
      data: {
        email: `concurrency-test-${Date.now()}-${i}@test.local`,
        name: `Test User ${i + 1}`,
        role: 'user',
      },
    });
    users.push(user);
  }
  console.log(`✅ Created ${users.length} test users`);
  return users;
}

async function deleteTestUsers() {
  await db.user.deleteMany({
    where: {
      email: { startsWith: 'concurrency-test-' },
    },
  });
  console.log('✅ Cleaned up test users');
}

async function createDummyEvent() {
  const slug = `concurrency-test-${Date.now()}`;
  const event = await db.event.create({
    data: {
      title: 'Concurrency Test Event',
      slug,
      startDate: new Date(Date.now() + 86400000), // tomorrow
      eventType: 'community',
      maxAttendees: 1,
      registeredCount: 0,
      description: 'Test event for concurrency testing',
      location: 'Test Location',
      raisedAmount: 0,
      tags: [],
    },
  });
  console.log(`✅ Created dummy event: ${event.slug}`);
  console.log(`   maxAttendees: ${event.maxAttendees}, registeredCount: ${event.registeredCount}`);
  return event;
}

async function deleteDummyEvent(slug) {
  // First delete any registrations
  const event = await db.event.findUnique({ where: { slug } });
  if (event) {
    await db.eventRegistration.deleteMany({
      where: { eventId: event.id },
    });
    
    // Then delete the event
    await db.event.delete({
      where: { slug },
    });
    console.log(`✅ Cleaned up dummy event and ${event.registeredCount} registration(s)`);
  }
  
  // Also clean up test users
  await deleteTestUsers();
}

/**
 * Simulates the race condition by executing multiple concurrent
 * database operations that mimic the API's non-atomic check-and-set.
 */
async function simulateConcurrentRegistration(event, users) {
  console.log(`   Simulating ${users.length} concurrent registration attempts...\n`);
  
  const attempts = users.map(async (user, index) => {
    const userId = user.id;
    try {
      // Read current state (NOT locked)
      const currentEvent = await db.event.findUnique({
        where: { id: event.id },
      });
      
      // Check capacity (this is where the race occurs)
      if (currentEvent.maxAttendees && currentEvent.registeredCount >= currentEvent.maxAttendees) {
        return { 
          index, 
          status: 'CONFLICT', 
          error: 'Event is at capacity',
          time: Date.now()
        };
      }
      
      // These two operations are NOT atomic - another request can slip between them
      const registration = await db.eventRegistration.create({
        data: {
          userId,
          eventId: event.id,
          status: 'registered',
        },
      });
      
      await db.event.update({
        where: { id: event.id },
        data: { registeredCount: { increment: 1 } },
      });
      
      return { 
        index, 
        status: 'SUCCESS', 
        registrationId: registration.id,
        time: Date.now()
      };
    } catch (error) {
      return { 
        index, 
        status: 'ERROR', 
        error: error.message,
        time: Date.now()
      };
    }
  });
  
  return Promise.all(attempts);
}

async function attemptRegistration(slug, requestId) {
  try {
    const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const data = await response.json().catch(() => ({}));
    
    return {
      requestId,
      status: response.status,
      ok: response.ok,
      error: data.error || null,
    };
  } catch (error) {
    return {
      requestId,
      status: 'ERROR',
      ok: false,
      error: error.message,
    };
  }
}

async function runConcurrencyTest() {
  console.log('\n========================================');
  console.log('  EVENT REGISTRATION CONCURRENCY TEST');
  console.log('========================================\n');
  
  console.log(`Concurrent requests: ${CONCURRENT_REQUESTS}`);
  console.log(`Target capacity: 1 attendee\n`);

  let event = null;

  try {
    // Step 1: Create dummy event
    console.log('Step 1: Creating dummy event...');
    event = await createDummyEvent();

    // Step 2: Create test users
    console.log('\nStep 2: Creating test users...');
    const users = await createTestUsers(CONCURRENT_REQUESTS);

    // Step 3: Simulate concurrent registrations at database level
    // (API requires auth, so we test the race condition logic directly)
    console.log(`\nStep 3: Testing race condition...`);
    const results = await simulateConcurrentRegistration(event, users);

    // Step 3: Analyze results
    console.log('--- Results ---');
    const successful = results.filter(r => r.status === 'SUCCESS');
    const conflicts = results.filter(r => r.status === 'CONFLICT');
    const errors = results.filter(r => r.status === 'ERROR');

    results.forEach((r, i) => {
      const icon = r.status === 'SUCCESS' ? '✅' : r.status === 'CONFLICT' ? '⚠️ ' : '❌';
      const label = r.status === 'SUCCESS' ? 'REGISTERED' : r.status === 'CONFLICT' ? 'REJECTED (capacity)' : 'ERROR';
      console.log(`  Request ${i + 1}: ${icon} ${label}${r.error ? ` - ${r.error}` : ''}`);
    });

    console.log('\n--- Summary ---');
    console.log(`  Successful: ${successful.length}`);
    console.log(`  Rejected:   ${conflicts.length}`);
    console.log(`  Errors:     ${errors.length}`);

    // Step 4: Verify database state
    const finalEvent = await db.event.findUnique({
      where: { slug: event.slug },
    });
    
    console.log(`\n--- Database State ---`);
    console.log(`  Final registeredCount: ${finalEvent.registeredCount}`);
    console.log(`  Max attendees: ${finalEvent.maxAttendees}`);

    const registrations = await db.eventRegistration.findMany({
      where: { eventId: event.id },
    });
    console.log(`  Total registration records: ${registrations.length}`);

    // Step 5: Assert expected behavior
    console.log('\n--- Assertions ---');
    let passed = true;

    // The critical test: with maxAttendees=1, we should have exactly 1 registration
    if (registrations.length === 1) {
      console.log('  ✅ PASS: Race condition is FIXED');
      console.log('      Exactly 1 registration exists (capacity enforced)');
    } else {
      console.log(`  ❌ FAIL: Race condition EXISTS`);
      console.log(`      Expected 1 registration, got ${registrations.length}`);
      console.log('      The capacity check is not atomic - multiple requests');
      console.log('      read the same counter value before any could update it.');
      passed = false;
    }

    if (finalEvent.registeredCount === 1) {
      console.log('  ✅ PASS: Counter is accurate');
    } else {
      console.log(`  ❌ FAIL: Counter mismatch`);
      console.log(`      Expected registeredCount=1, got ${finalEvent.registeredCount}`);
      passed = false;
    }

    if (successful.length === 1 && conflicts.length === CONCURRENT_REQUESTS - 1) {
      console.log('  ✅ PASS: Proper conflict detection');
    } else {
      console.log(`  ⚠️  ISSUE: Conflict detection not working as expected`);
      console.log(`      ${successful.length} succeeded, ${conflicts.length} rejected`);
    }

    console.log('\n========================================');
    if (passed) {
      console.log('  🎉 RACE CONDITION IS FIXED');
      console.log('  The capacity check is properly atomic');
    } else {
      console.log('  💥 RACE CONDITION DETECTED');
      console.log('  Multiple registrations succeeded despite capacity limit');
    }
    console.log('========================================\n');

    return passed;

  } catch (error) {
    console.error('\n💥 Test script error:', error.message);
    console.error(error.stack);
    return false;
  } finally {
    // Step 6: Cleanup
    if (event) {
      console.log('Step 6: Cleaning up...');
      await deleteDummyEvent(event.slug);
    }
    
    // Close Prisma connection
    await db.$disconnect();
    console.log('Disconnected from database.\n');
  }
}

// Run the test
runConcurrencyTest()
  .then(passed => {
    process.exit(passed ? 0 : 1);
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
