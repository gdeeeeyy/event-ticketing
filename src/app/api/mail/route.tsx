import { render } from "@react-email/render";
import MailTemplate from "../../../../emails/mail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const {Name, email, Events, Deets}=await request.json();
        console.log(Deets)

        // Send the email  
        const { data, error } = await resend.emails.send({
            from: "noreply@resend.dev",
            to: "gd14405@gmail.com",
            subject: "Confirmation of Your Registration for Kalaiyugam on Nov 30, 2024 - Reg.",
            react: <MailTemplate Name={Name} Events={Events} Deets={Deets}/>,
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
