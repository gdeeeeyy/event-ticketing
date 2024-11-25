import { render } from "@react-email/render";
import MailTemplate from "../../../../emails/mail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const emailData = await request.json(); // Expecting an array of email data

        const sendEmails = emailData.map(async ({ Name, email, Events, Deets }: any) => {
            // Simplify Events if it contains a comma
            const formattedEvents = Events.includes(",") ? "Events & Showcases" : Events;

            return resend.emails.send({
                from: "registrations@kalaiyugam.info",
                to: email,
                subject: "Confirmation of Your Registration for Kalaiyugam on Nov 30, 2024 - Reg.",
                react: <MailTemplate Name={Name} Events={formattedEvents} Deets={Deets} />,
            });
        });

        // Wait for all email promises to resolve
        await Promise.all(sendEmails);

        return new Response(JSON.stringify({ message: "All emails sent successfully!" }), {
            status: 200,
        });
    } catch (err) {
        console.error("Error sending emails:", err);
        return new Response(JSON.stringify({ error: "Failed to send emails" }), { status: 500 });
    }
}
