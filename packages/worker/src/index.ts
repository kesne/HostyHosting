import Queue from 'bull';
import mailgunAPI from 'mailgun-js';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY as string;
const MAILGUN_DOMAIN = 'sandbox8588d310f9064e8a9587fcbb0ef91400.mailgun.org';
const mailgun = mailgunAPI({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

const resetQueue = new Queue('reset emails');

// TODO: Given we are actually sending emails via mailgun's API, I question the value of doing this in a worker,
// as opposed to doing this directly in the thread. Mailgun will insulate the risk of this failing, so this is
// just as risky as a normal API call, which we seem plenty comfortable doing in the main thread of a request.
resetQueue.process(async job => {
    console.log('Attempting to send an email...');

    await mailgun.messages().send({
        from: `DaaS <noreply@${MAILGUN_DOMAIN}>`,
        to: job.data.to,
        subject: 'Password Reset',
        text: `You resquested a password reset on Docker As A Service. To complete the password reset, click here: https://daas.dev/reset-password/${job.data.uuid}`
    });

    console.log('Email has been sent!');
});

console.log('Worker started!');
