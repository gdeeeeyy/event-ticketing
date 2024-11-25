import { render } from "@react-email/render";
import MailTemplate from "../../../../emails/mail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to add a delay between requests to avoid hitting rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to send emails with rate-limiting
async function sendEmailsWithRateLimit(emailData, batchSize = 2, delayMs = 500) {
    for (let i = 0; i < emailData.length; i += batchSize) {
        const batch = emailData.slice(i, i + batchSize); // Create a batch of emails

        // Send all emails in the current batch concurrently
        await Promise.all(
            batch.map(async ({ Name, email, Events, Deets }) => {
                try {
                    // Simplify Events if it contains a comma
                    const formattedEvents = Events.includes(",") ? "Events & Showcases" : Events;

                    // Send the email
                    await resend.emails.send({
                        from: "registrations@kalaiyugam.info",
                        to: [email],
                        subject: "Confirmation of Your Registration for Kalaiyugam on Nov 30, 2024 - Reg.",
                        react: <MailTemplate Name={Name} Events={formattedEvents} Deets={Deets} />,
                    });

                    console.log(`Email successfully sent to: ${email}`);
                } catch (error) {
                    console.error(`Failed to send email to ${email}:`, error);
                }
            })
        );

        // Add delay after each batch to prevent hitting rate limits
        console.log(`Batch sent. Waiting for ${delayMs}ms...`);
        await delay(delayMs);
    }
}

/**
 * POST handler to send emails.
 */
export async function POST(request: Request) {
    try {
        // Parse the incoming email data (array of email objects)
        const emailData = await request.json();

        if (!Array.isArray(emailData) || emailData.length === 0) {
            return new Response(JSON.stringify({ error: "Invalid email data provided" }), { status: 400 });
        }

        // Log the recipients for debugging
        console.log("Email data received:", emailData.map(({ email }) => email));

        // Send emails with rate-limiting in batches of 2 and delay of 500ms between batches
        await sendEmailsWithRateLimit(emailData, 2, 500); // Adjust the batch size and delay as needed

        return new Response(JSON.stringify({ message: "All emails sent successfully!" }), {
            status: 200,
        });
    } catch (err) {
        console.error("Error sending emails:", err);
        return new Response(JSON.stringify({ error: "Failed to send emails" }), { status: 500 });
    }
}
