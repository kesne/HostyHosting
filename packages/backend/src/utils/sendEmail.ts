import mailgunAPI from 'mailgun-js';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY as string;
const MAILGUN_DOMAIN = 'sandbox8588d310f9064e8a9587fcbb0ef91400.mailgun.org';
const mailgun = mailgunAPI({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

export default async function sendEmail(to: string, subject: string, text: string) {
    await mailgun.messages().send({
        from: `DaaS <noreply@${MAILGUN_DOMAIN}>`,
        to,
        subject,
        text
    });

    console.log('Email has been sent!');
}
