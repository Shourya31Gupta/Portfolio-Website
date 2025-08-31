import { useState } from "react";
import { supabase } from "../lib/supabase";
import { sendContactNotification, formatContactData } from "../lib/emailService";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('🚀 Form submission started');
    console.log('📝 Form data:', formData);
    
    try {
      console.log('🔗 Attempting to connect to Supabase...');
      console.log('🔑 Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('🔑 Supabase Key length:', import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 'undefined');
      
      // Test Supabase connection first
      console.log('🧪 Testing Supabase connection...');
      const { data: testData, error: testError } = await supabase
        .from('contacts')
        .select('count')
        .limit(1);
      
      console.log('🧪 Connection test result:', { testData, testError });
      
      if (testError) {
        console.error('❌ Supabase connection test failed:', testError);
        setStatus("Database connection failed. Please try again later.");
        return;
      }
      
      // First, save to Supabase database
      console.log('💾 Attempting to insert into contacts table...');
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      console.log('📊 Supabase response:', { data, error });

      if (error) {
        console.error('❌ Supabase Error:', error);
        setStatus("Failed to send message.");
        return;
      }

      console.log('✅ Successfully saved to Supabase:', data);

      // Then, send email notification
      console.log('📧 Attempting to send email notification...');
      try {
        const contactData = formatContactData(formData);
        console.log('📧 Formatted contact data:', contactData);
        const emailResult = await sendContactNotification(contactData);
        
        console.log('📧 Email service result:', emailResult);
        
        if (emailResult.success) {
          console.log('📧 Email notification sent successfully');
        } else {
          console.warn('⚠️ Email notification failed:', emailResult.error);
          // Don't fail the form submission if email fails
        }
      } catch (emailError) {
        console.warn('⚠️ Email notification error:', emailError);
        // Don't fail the form submission if email fails
      }

      console.log('🎉 Form submission completed successfully!');
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (err) {
      console.error('💥 Unexpected error during form submission:', err);
      setStatus("Failed to send message.");
    } finally {
      console.log('🏁 Form submission process finished');
      setLoading(false);
    }
  };

  const testConnection = async () => {
    console.log('🧪 Testing Supabase connection...');
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('count')
        .limit(1);
      
      console.log('🧪 Connection test result:', { data, error });
      
      if (error) {
        console.error('❌ Connection failed:', error);
        alert('Connection failed: ' + error.message);
      } else {
        console.log('✅ Connection successful!');
        alert('Connection successful!');
      }
    } catch (err) {
      console.error('💥 Test error:', err);
      alert('Test error: ' + err.message);
    }
  };

  return (
    <div className="space-y-4">
      <button 
        type="button" 
        onClick={testConnection}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
      >
        🧪 Test Database Connection
      </button>
      
      <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="Name" 
        required 
        disabled={loading}
        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400"
      />
      <input 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
        disabled={loading}
        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400"
      />
      <textarea 
        name="message" 
        value={formData.message} 
        onChange={handleChange} 
        placeholder="Message" 
        required 
        disabled={loading}
        rows={4}
        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400 resize-none"
      />
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Sending...</span>
          </>
        ) : (
          <span>Send Message</span>
        )}
      </button>
      {status && (
        <div className={`p-3 rounded-lg text-center ${
          status.includes("successfully") 
            ? "bg-green-900/50 border border-green-800 text-green-300" 
            : "bg-red-900/50 border border-red-800 text-red-300"
        }`}>
          {status}
        </div>
      )}
      </form>
    </div>
  );
}
