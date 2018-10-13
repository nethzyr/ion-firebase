var functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const cors = require("cors")({ origin: true });

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "marharepa142@gmail.com",
    pass: "****"
  }
});

exports.httpEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const mailOptions = {
      from: "marharepa142@gmail.com", // sender address
      to: req.body.toEmail, // list of receivers
      subject: req.body.subject, // Subject line
      html: req.body.body // plain text body
    };

    return transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      } else {
        console.log(info);
        return res.status(200).send(info + " email sent!");
      }
    });
  });
});
