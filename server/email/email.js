import nodemailer from 'nodemailer'


var transporter = nodemailer.createTransport({
  service: 'mail.ru',
  auth: {
    user: 'hayk.hv@inbox.ru',
    pass: '$manv000630'
  }
});

var mailOptions = (email) => ({
  from: 'hayk.hv@inbox.ru',
  to: String(email),
  subject: 'New task',
  text: 'You have a new task. Please check your task board!'
})

const sendEmail = (email) => (
  transporter.sendMail(mailOptions(email), (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }))

export default sendEmail