require("dotenv").config();
const express = require("express");
const favicon = require("express-favicon");
const app = express();
const nodemailer = require("nodemailer");

app.use(express.static("public"));
app.use(favicon(__dirname + "/site/images/icon.png"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/site/index.html");
});

app.get("/feedback", (req, res) => {
  res.sendFile(__dirname + "/site/feedback.html");
});

app.get("/css", (req, res) => {
  res.sendFile(__dirname + "/site/index.css");
});

app.get("/background", (req, res) => {
  res.sendFile(__dirname + "/site/images/background.jpg");
});

app.get("/icon", (req, res) => {
  res.sendFile(__dirname + "/site/images/icon.png");
});

app.get("/activeRadio", (req, res) => {
  res.sendFile(__dirname + "/site/images/activeRadio.png");
});

app.get("/checkedRadio", (req, res) => {
  res.sendFile(__dirname + "/site/images/checkedRadio.png");
});

app.get("/uncheckedRadio", (req, res) => {
  res.sendFile(__dirname + "/site/images/uncheckedRadio.png");
});

app.post("/submit", async (req, res) => {
  let { name, email, type, feedback } = req.body;
  let transporter = nodemailer.createTransport({
    host: "smtp.ionos.com",
    port: 587,
    secure: false,
    auth: {
      user: "feedback@comicsams.nrdesign.xyz",
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter
    .sendMail({
      from: "feedback@comicsams.nrdesign.xyz",
      to: "feedback@comicsams.nrdesign.xyz",
      subject: `${name} has feedback for Comic Sams`,
      text: "",
      html: `
<div
  style="width: 90%; margin: 0 auto; text-align: center; color: white; border-radius: 3px; background-image: gradient(linear,left top,right top,color-stop(0, #f22),color-stop(0.15, #f2f),color-stop(0.3, #22f),color-stop(0.45, #2ff),color-stop(0.6, #2f2),color-stop(0.75, #2f2),color-stop(0.9, #ff2),color-stop(1, #f22));background-image: -webkit-gradient(linear,left top,right top,color-stop(0, #f22),color-stop(0.15, #f2f),color-stop(0.3, #22f),color-stop(0.45, #2ff),color-stop(0.6, #2f2),color-stop(0.75, #2f2),color-stop(0.9, #ff2),color-stop(1, #f22));"
>
  <h1 style="-webkit-text-stroke: #000 1px;">Feedback for Comic Sams</h1>
</div>
<table style="width: 100%;padding-left: 5%;">
  <tbody>
    <tr>
      <td style="text-align: left;">
        <h3>Name: ${name}</h3>
      </td>
    </tr>
    <tr>
      <td style="text-align: left;">
        <h3>Email: ${email}</h3>
      </td>
    </tr>
    <tr>
      <td style="text-align:left;">
        <h3>Type: ${type}</h3>
      </td>
    </tr>
  </tbody>
</table>
<table style="width: 100%; padding-left: 5%;">
  <tbody>
    <tr>
      <td style="text-align: left;">
        <h3>Feedback:</h3>
        <p style="width:40%;">${feedback}</p>
      </td>
    </tr>
  </tbody>
</table>
`
    })
    .then(info => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(process.env.PORT || 5000, () => {});
