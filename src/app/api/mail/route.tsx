import { render } from "@react-email/render";
import MailTemplate from "../../../../emails/mail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email, Name, Events, Deets } = await request.json();

        // Wait for the rendered HTML
        const htmlContent = await render(MailTemplate({ Name, Events, Deets }));

        // Send the email  
        const { data, error } = await resend.emails.send({
            from: "noreply@resend.dev",
            to: [email],
            subject: "Confirmation of Your Registration for Kalaiyugam on Nov 30, 2024 - Reg.",
            html: htmlContent,
        });

        if (error) {
            return new Response(JSON.stringify(error), { status: 500 });
        }

        return new Response(JSON.stringify({ message: `Email sent successfully to ${Name}` }), {
            status: 200,
        });
    } catch (err) {
        console.error("Error sending email:", err);
        return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
}
