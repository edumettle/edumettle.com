# EduMettle Website

A modern, responsive website for EduMettle - an educational platform offering AI Fluency courses.

## Features

- **Responsive Design**: Mobile-first approach with dark/light mode support
- **Course Management**: Dynamic course information with pricing and scheduling
- **Payment Integration**: Razorpay payment gateway integration
- **Email Notifications**: Automated email confirmations via Zoho Mail
- **PDF Receipts**: Automated PDF receipt generation
- **Google Sheets Integration**: Form data storage and management
- **Contact Forms**: User-friendly contact and registration forms
- **SEO Optimized**: Meta tags, favicons, and structured data

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Payment**: Razorpay integration
- **Email**: Nodemailer with Zoho SMTP
- **Data Storage**: Google Sheets API
- **PDF Generation**: PDF-lib
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud Console project (for Sheets API)
- Razorpay account
- Zoho Mail account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/edumettle/edumettle.com.git
cd edumettle.com
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables file:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
# Google Sheets API
GSHEET_SPREADSHEET_ID=your_spreadsheet_id
GSHEET_CLIENT_EMAIL=your_service_account_email
GSHEET_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GSHEET_SHEET_CONTACT=Contact
GSHEET_SHEET_REGISTRATION=Registration

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Zoho Mail
ZOHO_EMAIL=your_zoho_email
ZOHO_PASSWORD=your_zoho_app_password
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form handler
│   │   ├── registration/  # Registration handler
│   │   ├── payment/       # Payment verification
│   │   ├── generate-receipt/ # PDF receipt generation
│   │   └── send-confirmation-email/ # Email notifications
│   ├── courses/           # Courses page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── registration/      # Registration page
│   ├── success/           # Payment success page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── cancellation-refund/ # Cancellation policy
│   ├── shipping/          # Shipping policy
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero section
│   ├── CourseCard.tsx     # Course display card
│   ├── TestimonialCard.tsx # Testimonial card
│   ├── Notification.tsx   # Toast notifications
│   └── ThemeProvider.tsx  # Theme context
├── lib/                   # Utility libraries
│   ├── googleSheets.ts    # Google Sheets integration
│   └── razorpay.ts        # Razorpay integration
└── styles/                # Global styles
    └── globals.css        # Tailwind CSS imports
```

## API Endpoints

- `POST /api/contact` - Handle contact form submissions
- `POST /api/registration` - Handle course registrations
- `POST /api/payment/verify` - Verify Razorpay payments
- `POST /api/generate-receipt` - Generate PDF receipts
- `POST /api/send-confirmation-email` - Send confirmation emails

## Environment Variables

### Required Variables

- `GSHEET_SPREADSHEET_ID`: Google Sheets spreadsheet ID
- `GSHEET_CLIENT_EMAIL`: Google service account email
- `GSHEET_PRIVATE_KEY`: Google service account private key
- `RAZORPAY_KEY_ID`: Razorpay API key ID
- `RAZORPAY_KEY_SECRET`: Razorpay API key secret
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Public Razorpay key ID
- `ZOHO_EMAIL`: Zoho email address
- `ZOHO_PASSWORD`: Zoho app password

### Optional Variables

- `GSHEET_SHEET_CONTACT`: Contact sheet name (default: "Contact")
- `GSHEET_SHEET_REGISTRATION`: Registration sheet name (default: "Registration")

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is proprietary software owned by EduMettle.

## Support

For support, email hello@edumettle.com or call +91 7848843524.

## Changelog

### v1.0.0 (January 2025)
- Initial release
- Complete website with all features
- Payment integration
- Email notifications
- PDF receipt generation
- Google Sheets integration