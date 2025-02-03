import nodemailer from 'nodemailer';

/**
 * Creates a Nodemailer transporter object using the specified SMTP settings.
 * 
 * The transporter is configured to use the SMTP relay service provided by Brevo.
 * The SMTP credentials (user and pass) are retrieved from environment variables.
 * 
 * @type {import('nodemailer').Transporter}
 * @property {string} host - The hostname of the SMTP server.
 * @property {number} port - The port number to connect to the SMTP server.
 * @property {object} auth - The authentication object containing user credentials.
 * @property {string} auth.user - The username for SMTP authentication.
 * @property {string} auth.pass - The password for SMTP authentication.
 */
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export default transporter;