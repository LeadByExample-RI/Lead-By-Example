/**
 * Donation Receipt Email Template
 *
 * Sent to donors after successful donation.
 */

interface DonationReceiptEmailProps {
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  campaign?: string;
  transactionId: string;
  message?: string;
}

export default function DonationReceiptEmail({
  donorName,
  donorEmail,
  amount,
  currency,
  campaign,
  transactionId,
  message,
}: DonationReceiptEmailProps) {
  const displayAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(amount);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Donation Receipt - Lead By Example</title>
        <style>
          {`
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              line-height: 1.5;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              color: #1e40af;
              font-size: 28px;
            }
            .content {
              margin: 30px 0;
            }
            .greeting {
              font-size: 16px;
              margin-bottom: 20px;
            }
            .amount-box {
              background-color: #f0f9ff;
              border-left: 4px solid #2563eb;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .amount-label {
              font-size: 12px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .amount-value {
              font-size: 32px;
              font-weight: bold;
              color: #2563eb;
            }
            .details {
              margin: 20px 0;
              font-size: 14px;
              background-color: #f8f8f8;
              padding: 15px;
              border-radius: 4px;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              padding-bottom: 10px;
              border-bottom: 1px solid #e0e0e0;
            }
            .detail-row:last-child {
              margin-bottom: 0;
              padding-bottom: 0;
              border-bottom: none;
            }
            .detail-label {
              color: #666;
              font-weight: 500;
            }
            .detail-value {
              color: #333;
              font-weight: bold;
            }
            .impact {
              background-color: #f0fdf4;
              border-left: 4px solid #16a34a;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .impact h3 {
              margin: 0 0 10px 0;
              color: #16a34a;
              font-size: 16px;
            }
            .impact p {
              margin: 0;
              font-size: 14px;
              color: #333;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            .footer-links {
              margin-top: 15px;
            }
            .footer-links a {
              color: #2563eb;
              text-decoration: none;
              margin: 0 10px;
            }
            .button {
              display: inline-block;
              background-color: #2563eb;
              color: white;
              padding: 12px 24px;
              border-radius: 4px;
              text-decoration: none;
              font-weight: 500;
              margin-top: 20px;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>💙 Thank You!</h1>
            <p style={{ margin: '10px 0 0 0', color: '#666' }}>Donation Receipt</p>
          </div>

          {/* Greeting */}
          <div className="greeting">
            <p>
              Dear <strong>{donorName}</strong>,
            </p>
            <p>
              We deeply appreciate your generous donation to Lead By Example. Your support helps us break the
              school-to-prison pipeline and create pathways to success for at-risk youth in our community.
            </p>
          </div>

          {/* Amount Box */}
          <div className="amount-box">
            <div className="amount-label">Total Donation</div>
            <div className="amount-value">{displayAmount}</div>
            {campaign && <div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>{campaign}</div>}
          </div>

          {/* Transaction Details */}
          <div className="details">
            <div className="detail-row">
              <span className="detail-label">Transaction ID:</span>
              <span className="detail-value">{transactionId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{donorEmail}</span>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="impact">
            <h3>🌟 Your Impact</h3>
            <p>
              Thanks to supporters like you, Lead By Example is able to provide mentorship, educational resources,
              and community support to young people in our community. Your donation directly helps us achieve our
              mission.
            </p>
          </div>

          {/* Custom Message */}
          {message && (
            <div style={{ marginTop: '20px', fontSize: '14px', color: '#333' }}>
              <p>{message}</p>
            </div>
          )}

          {/* Call-to-Action */}
          <div style={{ textAlign: 'center' }}>
            <a href={`${process.env.NEXT_PUBLIC_APP_URL}/`} className="button">
              Visit Our Website
            </a>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>
              Lead By Example Initiative
              <br />
              StrayDog Syndications LLC
            </p>
            <p style={{ marginTop: '10px' }}>
              This is an automated receipt for your donation. Please do not reply to this email.
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL && (
                <>
                  {' '}
                  Contact us at{' '}
                  <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</a>
                  .
                </>
              )}
            </p>
            <div className="footer-links">
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/privacy`}>Privacy</a>
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/terms`}>Terms</a>
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/`}>Website</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
