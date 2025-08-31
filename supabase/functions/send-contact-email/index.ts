import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { contactData } = await req.json()
    
    if (!contactData || !contactData.name || !contactData.email || !contactData.message) {
      throw new Error('Missing required contact data')
    }

    const emailResult = await sendEmail(contactData)
    
    if (emailResult.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: emailResult.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } else {
      throw new Error(emailResult.error)
    }

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})

async function sendEmail(contactData: any) {
  try {
    const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY')
    const toEmail = Deno.env.get('TO_EMAIL') || 'shourya31gupta@gmail.com'
    
    if (!sendgridApiKey) {
      console.log('⚠️ SendGrid API key not configured. Set SENDGRID_API_KEY in Supabase dashboard.')
      return { success: false, error: 'SendGrid not configured' }
    }
    
    // Send real email using SendGrid
    const emailData = {
      personalizations: [
        {
          to: [{ email: toEmail, name: 'Portfolio Contact' }],
          subject: 'New Contact Form Submission - Portfolio Website'
        }
      ],
      from: { email: 'shourya31gupta@gmail.com', name: 'Portfolio Website' },
      content: [
        {
          type: 'text/html',
          value: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${contactData.message}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p><em>This email was sent from your portfolio website contact form.</em></p>
          `
        }
      ]
    }
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })
    
    if (response.ok) {
      console.log('📧 Email sent successfully via SendGrid')
      return { success: true, message: 'Email sent successfully!' }
    } else {
      const errorData = await response.json()
      console.error('📧 SendGrid error:', errorData)
      return { success: false, error: `SendGrid error: ${response.status}` }
    }
    
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error: error.message }
  }
}
