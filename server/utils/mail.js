const sendMail = (mailer, mailOptions) => {
    return new Promise((resolve, reject) => {
        mailer.sendMail(mailOptions, (error, info) => {
            if (error) return reject(error);
            resolve(info);
        });
    });
}

module.exports = { sendMail }