import emailjs from '@emailjs/browser';

// Email notification service for contact form submissions
// This will send you an email every time someone contacts you using EmailJS

export const sendContactNotification = async (contactData) => {
  try {
    console.log('📧 Attempting to send email via EmailJS...');
    
    // Check if EmailJS environment variables are set
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('⚠️ EmailJS credentials are missing. Check your .env file.');
      throw new Error('Email service not configured');
    }

    // Map the contact data to the template variables expected by EmailJS
    // Note: You must ensure these variable names match exactly what you set up in your EmailJS template!
    const templateParams = {
      name: contactData.name,
      email: contactData.email,
      message: contactData.message,
      title: 'New Portfolio Inquiry',
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );
    
    console.log('📧 EmailJS response:', response);
    
    if (response.status === 200) {
      return { success: true, message: 'Email notification sent via EmailJS!' };
    } else {
      throw new Error(response.text || 'Failed to send email');
    }
    
  } catch (error) {
    console.error('❌ EmailJS error:', error);
    
    // Fallback to console logging if email service fails
    console.log('📧 ===== FALLBACK EMAIL NOTIFICATION =====');
    console.log('📧 To: You (via EmailJS configuration)');
    console.log('📧 Subject: New Contact Form Submission - Portfolio Website');
    console.log('📧 Contact Details:');
    console.log(`📧   Name: ${contactData.name}`);
    console.log(`📧   Email: ${contactData.email}`);
    console.log(`📧   Message: ${contactData.message}`);
    console.log(`📧   Time: ${new Date().toLocaleString()}`);
    console.log('📧 ================================');
    
    return { success: false, error: error.message };
  }
};

// Helper function to format contact data
export const formatContactData = (contact) => {
  return {
    name: contact.name || 'Not provided',
    email: contact.email || 'Not provided',
    message: contact.message || 'No message',
    timestamp: new Date().toISOString()
  };
};

// Function to test email service
export const testEmailService = () => {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message to verify email notifications are working.',
    timestamp: new Date().toISOString()
  };
  
  console.log('🧪 Testing email service...');
  sendContactNotification(testData);
};
