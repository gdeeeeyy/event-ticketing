## Oh-sheet : A Last Minute Event Management App

**_Oh-sheet_** is an app designed for college-event management. This app has features to automate the email sending and QR code generation process for pre-event works; By uploading the REST API of the registrations sheet, you can clean and process the REST API, and this will further be used by **_Resend_** and **_React-Email_** to automate the mail sending process to all the attendees - along with the QR code.

Oh-sheet also has a QR Code reading feature to ensure proper check-in of all the attendees. It also has a feature to ensure that the QR Code can be scanned only once. Finally, Oh-Sheet can be used for any type of college-event with just a few tweaks at a few places in the code.

# How to run it

1. Clone the Repository

   `git clone https://github.com/gdeeeeyy/event-ticketing.git`

2. Run the web app locally on your machine

   `https://localhost:3000`

3. Run the email server to view the email styling locally

   `https://localhost:3001`

# Changes to be made

The major changes to be made in the code would be in the `page.tsx` file. You'd have to change the `keysToRemove` and then the `keyMapping` variable with respect to the REST API data fields.

Additionally the email template is present it `emails/mail.tsx` where the mail templace can be changed to the mail templates available in [React-email](https://react.email/docs) website.

In the `src/app/api/mail/route.tsx` you can edit the mail routes and other details regarding the mailing list and many more.

# Working Example

Currently am working on the UI so, the working would be posted soon.
