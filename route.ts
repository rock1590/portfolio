import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json() // Added 'phone'

    // --- IMPORTANT: For a real application, integrate an email sending service here ---
    // Example using a hypothetical email service:
    // await emailService.send({
    //   to: 'ravi.infigo@gmail.com',
    //   from: 'noreply@yourportfolio.com', // Use a verified sender email
    //   subject: `New Contact Form Submission from ${name}`,
    //   html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`, // Included phone
    // });
    // ---------------------------------------------------------------------------------

    console.log(`
--- Simulating Email Send ---
To: ravi.infigo@gmail.com
From: Contact Form
Subject: New Contact Form Submission
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
-----------------------------
`)

    // Simulate a delay for network request
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({ success: true, message: "Message sent successfully!" })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ success: false, error: "Failed to send message." }, { status: 500 })
  }
}
