import nodemailer from 'nodemailer'


var transporter = nodemailer.createTransport({
  service: 'mail.ru',
  auth: {
    user: 'ava8889@inbox.ru',
    pass: '$CRM123$'
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