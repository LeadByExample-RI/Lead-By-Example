/**
 * Welcome Email Template
 *
 * Sent to new users upon registration or newsletter signup.
 */

interface WelcomeEmailProps {
  email: string;
  name?: string;
}

export default function WelcomeEmail({ email, name }: WelcomeEmailProps) {
  const firstName = name?.split(' ')[0] || 'Friend';

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Welcome to Lead By Example</title>
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
              background: linear-gradient(135deg, #1e40af 0%, #dc2626 100%);
              padding: 40px 20px;
              border-radius: 8px;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: bold;
            }
            .header p {
              margin: 10px 0 0 0;
              opacity: 0.9;
            }
            .content {
              margin: 30px 0;
              font-size: 16px;
            }
            .content p {
              margin: 15px 0;
            }
            .section {
              margin: 30px 0;
              padding: 20px;
              background-color: #f8f8f8;
              border-radius: 8px;
            }
            .section h3 {
              margin: 0 0 15px 0;
              color: #1e40af;
              font-size: 18px;
            }
            .section ul {
              margin: 0;
              padding-left: 20px;
            }
            .section li {
              margin: 8px 0;
            }
            .button {
              display: inline-block;
              background-color: #1e40af;
              color: white;
              padding: 12px 24px;
              border-radius: 4px;
              text-decoration: none;
              font-weight: 500;
              margin-top: 20px;
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
              color: #1e40af;
              text-decoration: none;
              margin: 0 10px;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>Welcome to Lead By Example</h1>
            <p>Breaking the School-to-Prison Pipeline Together</p>
          </div>

          {/* Greeting */}
          <div className="content">
            <p>Hi {firstName},</p>
            <p>
              Welcome! We're thrilled to have you join our community of supporters, mentors, and advocates committed to
              creating pathways to success for at-risk youth.
            </p>
          </div>

          {/* What You Can Do */}
          <div className="section">
            <h3>What You Can Do With Your Account</h3>
            <ul>
              <li>💰 Make donations to support our initiatives</li>
              <li>📅 Register for community events</li>
              <li>👥 Connect as a mentor or volunteer</li>
              <li>📚 Access educational resources</li>
              <li>📧 Stay updated with our newsletter</li>
            </ul>
          </div>

          {/* Get Started */}
          <div className="section">
            <h3>Get Started</h3>
            <p>
              Explore our platform to learn more about how you can make a difference. Whether you want to contribute
              financially, volunteer your time, or simply stay informed, there's a way for you to get involved.
            </p>
            <a href={`${process.env.NEXT_PUBLIC_APP_URL}/`} className="button">
              Explore Now
            </a>
          </div>

          {/* FAQ */}
          <div className="section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href={`${process.env.NEXT_PUBLIC_APP_URL}/events`} style={{ color: '#1e40af' }}>
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href={`${process.env.NEXT_PUBLIC_APP_URL}/mentors`} style={{ color: '#1e40af' }}>
                  Mentorship Program
                </a>
              </li>
              <li>
                <a href={`${process.env.NEXT_PUBLIC_APP_URL}/resources`} style={{ color: '#1e40af' }}>
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>
              Lead By Example Initiative
              <br />
              StrayDog Syndications LLC
            </p>
            <p style={{ marginTop: '10px', color: '#999' }}>
              You received this email because you signed up or created an account on our website. To manage your
              preferences, visit your account settings.
            </p>
            <div className="footer-links">
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/privacy`}>Privacy</a>
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/terms`}>Terms</a>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>Contact</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
