let nodemailer = require("nodemailer");
const sendMail = (to, subject, html) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "voicoiloichoi@gmail.com",
            pass: "0979581350"
        }
    })
    let mailOption = {
        from: "voicoiloichoi@gmail.com",
        to: to,
        subject: subject,
        html: html
    }
    transporter.sendMail(mailOption, function (err, data) {
        if (err) {
            console.log("lỗi");
            (err)
        } else {
            console.log("success");
        }
    })
}

module.exports =sendMail;