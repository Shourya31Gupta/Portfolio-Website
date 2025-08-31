// Email notification service for contact form submissions
// This will send you an email every time someone contacts you

// Supabase Edge Function (FREE - Primary method)
export const sendContactNotification = async (contactData) => {
  try {
    // Send email via Supabase Edge Function
    const EDGE_FUNCTION_URL = 'https://ldsmawygbmztxkoyiwor.supabase.co/functions/v1/send-contact-email';
    
    console.log('📧 Attempting to send email via Supabase Edge Function...');
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ contactData }),
    });
    
    const result = await response.json();
    console.log('📧 Edge function response:', result);
    
    if (result.success) {
      return { success: true, message: 'Email notification sent via Supabase!' };
    } else {
      throw new Error(result.error || 'Failed to send email');
    }
    
  } catch (error) {
    console.error('❌ Edge function error:', error);
    
    // Fallback to console logging if edge function fails
    console.log('📧 ===== FALLBACK EMAIL NOTIFICATION =====');
    console.log('📧 To: shourya31gupta@gmail.com');
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
