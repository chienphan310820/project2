var nodemailer = require('nodemailer');
const sendMail = (to, subject, html) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nqt130298@gmail.com',
            pass: 'Ninhbinh123'
        }
    });

    var mailOptions = {
        from: 'nqt130298@gmail.com',
        to: to,
        subject: String,
        html: String
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ');
        }
    })
}

module.exports = sendMail;