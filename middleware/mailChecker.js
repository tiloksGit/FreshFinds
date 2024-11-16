const nodemailer = require("nodemailer");

const mailController = (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      //   user: "freshfinds860@hotmail.com",
      //   pass: "FreshFinds123@",
      user: "freshfinds860@gmail.com",
      pass: "Ffinds123@202469",
    },
  });
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  console.log(randomNumber);

  const options = {
    from: "freshfinds860@gmail.com",
    to: email,
    subject: "Smart bin update notification",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .header {
            text-align: center;
            background-color: #4CAF50;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
            color: #fff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            text-align: center;
            padding: 20px;
        }
        .code {
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Welcome to FreshFinds!</h1>
        </div>

        <!-- Main Content -->
        <div class="content">
            <p>Hi there,</p>
            <p>Thank you for signing up with FreshFinds! Please verify your email address by using the 4-digit verification code below:</p>
            <div class="code">{${randomNumber}}</div>
            <p>This code will expire in 15 minutes. If you didn’t request this verification, please ignore this email.</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>If you have any questions, contact us at <a href="mailto:support@freshfinds.com">support@freshfinds.com</a>.</p>
            <p>&copy; 2024 FreshFinds. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

        `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        reject(err);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
};

module.exports = mailController;
