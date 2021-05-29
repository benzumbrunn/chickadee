import nodemailer from "nodemailer";
import config from "config";

const emailConfig: any = config.get('email');

// create reusable transporter object using the default SMTP transport
const mailer = nodemailer.createTransport({
  secure: false, // true for 465, false for other ports
  ...emailConfig,
});

export default mailer;
