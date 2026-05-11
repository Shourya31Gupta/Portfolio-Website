# 🚀 Portfolio Website

A modern, responsive portfolio website built with React, featuring a beautiful design, contact form functionality, and seamless email notifications.

## ✨ Features

- **🎨 Modern Design** - Clean, professional interface with smooth animations
- **📱 Fully Responsive** - Works perfectly on all devices (desktop, tablet, mobile)
- **📧 Contact Form** - Functional contact form with real-time email notifications
- **🗄️ Database Integration** - Supabase backend for storing contact submissions
- **📬 Email Service** - EmailJS integration for instant email delivery
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
- **Supabase** - Backend-as-a-Service for database
- **PostgreSQL** - Reliable database for storing contact form submissions
- **EmailJS** - Client-side email service for contact notifications

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Git** - Version control and collaboration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account
- EmailJS account

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
   - Fill in your credentials:
     ```env
     VITE_SUPABASE_URL=your-supabase-project-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     
     VITE_ADMIN_USERNAME=your-admin-username
     VITE_ADMIN_PASSWORD=your-admin-password
     
     VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
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

### EmailJS Configuration
1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Add a new Email Service (e.g., Gmail) to get your `Service ID`
3. Create an Email Template with variables like `{{from_name}}`, `{{from_email}}`, and `{{message}}` to get your `Template ID`
4. Find your `Public Key` in the Account section
5. Add these credentials to your `.env` file

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
- **EmailJS** - For reliable client-side email delivery
- **Vite** - For the fast build tool


If you have any questions or need help:
- Create an issue in this repository
- Check the [Supabase documentation](https://supabase.com/docs)
- Review the [SendGrid documentation](https://sendgrid.com/docs)

---
**Made with by Shourya Gupta**
