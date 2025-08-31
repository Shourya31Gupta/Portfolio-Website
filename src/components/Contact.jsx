import { useState } from "react";
import { supabase } from "../lib/supabase";
import { sendContactNotification, formatContactData } from "../lib/emailService";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import contactBg from "../assets/contact-bg.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");
    
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
        setStatus("❌ Database connection failed. Please try again later.");
        return;
      }
      
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
        console.error("❌ Supabase Error:", error);
        setStatus("❌ Failed to send. Please try again.");
        return;
      }

      console.log('✅ Successfully saved to Supabase:', data);
      
      // Send email notification via Edge Function
      console.log('📧 Attempting to send email notification...');
      console.log('🔍 DEBUG: sendContactNotification function:', typeof sendContactNotification);
      console.log('🔍 DEBUG: formatContactData function:', typeof formatContactData);
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
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("💥 Unexpected error during form submission:", error);
      setStatus("❌ Failed to send. Please try again.");
    } finally {
      console.log('🏁 Form submission process finished');
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "shourya31gupta@gmail.com",
      link: "mailto:shourya31gupta@gmail.com?subject=Portfolio Inquiry&body=Hi Shourya, I came across your portfolio and would like to discuss a project. Please let me know when would be a good time to connect. Best regards, [Your Name]"
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+91 9096700193",
      link: "tel:+919096700193"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Mumbai, India",
      link: "#"
    }
  ];

  const handleEmailClick = (e) => {
    e.preventDefault();
    const emailLink = "mailto:shourya31gupta@gmail.com?subject=Portfolio Inquiry&body=Hi Shourya, I came across your portfolio and would like to discuss a project. Please let me know when would be a good time to connect. Best regards, [Your Name]";
    console.log("Opening email client with:", emailLink);
    window.location.href = emailLink;
  };

  return (
    <section 
      className="relative min-h-screen py-16 text-white" 
      id="contact"
      style={{
        backgroundImage: `url(${contactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Simple overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Ready to start a conversation? Let's discuss how we can work together 
            to bring your ideas to life.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Contact Information */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="glass p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white">Let's Connect</h3>
              <p className="text-base text-zinc-300 mb-6 leading-relaxed">
                I'm always interested in hearing about new opportunities, 
                interesting projects, or just want to say hello. Feel free to reach out!
              </p>
              
              {/* Contact Info Cards */}
              <div className="space-y-3">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      onClick={info.title === "Email" ? handleEmailClick : undefined}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group border border-white/10 hover:border-white/20"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2 flex items-center justify-center">
                        <Icon className="text-white text-lg" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{info.title}</h4>
                        <p className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-200">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="glass p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white">Send a Message</h3>
              

              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-zinc-300 font-medium">Your Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 bg-white/5 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all duration-200 border border-white/10 focus:border-blue-500/50"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-zinc-300 font-medium">Your Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 bg-white/5 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all duration-200 border border-white/10 focus:border-blue-500/50"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-zinc-300 font-medium">Your Message</span>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project or just say hello..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full mt-1 p-3 bg-white/5 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all duration-200 border border-white/10 focus:border-blue-500/50 resize-none"
                    required
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" />
                      Send Message
                    </>
                  )}
                </button>

                {status && (
                  <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                    status.includes("✅") 
                      ? "bg-green-900/50 text-green-300 border border-green-600" 
                      : "bg-red-900/50 text-red-300 border border-red-600"
                  }`}>
                    {status.includes("✅") ? (
                      <FaCheckCircle className="text-base" />
                    ) : (
                      <FaExclamationTriangle className="text-base" />
                    )}
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
