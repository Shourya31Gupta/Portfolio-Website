# 🚀 Portfolio Website

A modern, responsive portfolio website built with React, featuring a beautiful design, contact form functionality, and seamless email notifications.

## ✨ Features

- **🎨 Modern Design** - Clean, professional interface with smooth animations
- **📱 Fully Responsive** - Works perfectly on all devices (desktop, tablet, mobile)
- **📧 Contact Form** - Functional contact form with real-time email notifications
- **🗄️ Database Integration** - Supabase backend for storing contact submissions
- **📬 Email Service** - SendGrid integration for instant email delivery
- **⚡ Fast Performance** - Built with Vite for optimal loading speeds
- **🎯 SEO Optimized** - Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Client-side routing for smooth navigation
- **React Icons** - Beautiful icon library for enhanced UI

### Backend & Services
- **Supabase** - Backend-as-a-Service for database and Edge Functions
- **PostgreSQL** - Reliable database for storing contact form submissions
- **SendGrid** - Professional email service for contact notifications
- **Edge Functions** - Serverless functions for email processing

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Git** - Version control and collaboration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account
- SendGrid account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials and admin panel credentials:
     ```env
     VITE_SUPABASE_URL=your-supabase-project-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     VITE_ADMIN_USERNAME=your-admin-username
     VITE_ADMIN_PASSWORD=your-admin-password
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Your portfolio website should be running!

## 🗄️ Database Setup

### Supabase Configuration
1. Create a new Supabase project
2. Create a `contacts` table with the following schema:
   ```sql
   CREATE TABLE contacts (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Edge Function Setup
1. Navigate to Supabase Dashboard → Edge Functions
2. Create a new function: `send-contact-email`
3. Deploy the function code from `supabase/functions/send-contact-email/index.ts`
4. Set environment variables:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `TO_EMAIL`: Your email address for notifications

## 📧 Email Service Setup

### SendGrid Configuration
1. Create a SendGrid account
2. Generate an API key with "Mail Send" permissions
3. Verify your sender email address
4. Add the API key to your Supabase Edge Function environment variables

## 🔐 Admin Panel Setup

### Authentication
The admin panel provides secure access to view and manage contact form submissions.

1. **Set Admin Credentials**
   - Add your preferred admin username and password to your `.env` file:
     ```env
     VITE_ADMIN_USERNAME=your-chosen-username
     VITE_ADMIN_PASSWORD=your-chosen-password
     ```

2. **Access Admin Panel**
   - Navigate to `/admin/login` on your website
   - Use the credentials you set in the environment variables
   - After successful login, you'll be redirected to `/admin/contact`

3. **Features**
   - View all contact form submissions
   - Delete unwanted submissions
   - Secure logout functionality
   - Responsive design for all devices

**⚠️ Security Note**: Never commit your `.env` file to version control. The `.env.example` file serves as a template only.

## 🎨 Customization

### Personal Information
- Update personal details in component files
- Modify the hero section with your name and title
- Add your own projects and achievements
- Update contact information

### Styling
- Customize colors in `tailwind.config.js`
- Modify component styles in individual component files
- Update animations and transitions

### Content
- Replace placeholder text with your actual content
- Add your own images to the `src/assets` folder
- Update project descriptions and links

## 📱 Project Structure

```
portfolio-website/
├── src/
│   ├── components/          # React components
│   │   ├── About.jsx       # About section
│   │   ├── Achievements.jsx # Achievements section
│   │   ├── Contact.jsx     # Contact form
│   │   ├── Hero.jsx        # Hero section
│   │   ├── Navbar.jsx      # Navigation
│   │   ├── Projects.jsx    # Projects showcase
│   │   ├── Publications.jsx # Publications section
│   │   ├── Resume.jsx      # Resume section
│   │   └── Auth/           # Authentication components
│   │       ├── LoginForm.jsx # Admin login form
│   │       └── ProtectedRoute.jsx # Route protection
│   ├── contexts/            # React contexts
│   │   └── AuthContext.jsx # Authentication context
│   ├── pages/               # Page components
│   │   └── ContactAdminView.jsx # Admin dashboard
│   ├── lib/                 # Utility functions
│   │   ├── emailService.js # Email service logic
│   │   └── supabase.js     # Supabase client
│   ├── assets/              # Images and static files
│   ├── App.jsx              # Main app component
│   └── main.jsx             # App entry point
├── supabase/                # Supabase configuration
│   └── functions/           # Edge Functions
├── public/                  # Public assets
└── package.json             # Dependencies and scripts
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set environment variables in the deployment platform
3. Deploy automatically on push to main branch

### Supabase Edge Functions
```bash
supabase functions deploy send-contact-email
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS approach
- **Supabase** - For the excellent backend services
- **SendGrid** - For reliable email delivery
- **Vite** - For the fast build tool


If you have any questions or need help:
- Create an issue in this repository
- Check the [Supabase documentation](https://supabase.com/docs)
- Review the [SendGrid documentation](https://sendgrid.com/docs)

---
**Made with by Shourya Gupta**
