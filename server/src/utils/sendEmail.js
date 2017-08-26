
import nodemailer from 'nodemailer'

import { EMAIL_LOGIN, EMAIL_PASSWORD } from '../secret'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_LOGIN,
        pass: EMAIL_PASSWORD
    }
})

async function sendEmail({ fromAddr, toAddrs, subject, message }) {
    var mailOptions = {
        from: fromAddr,
        to: toAddrs.join(', '),
        subject: subject,
        html: message // html body
    }

    return transporter.sendMail(mailOptions)
}

export default sendEmail