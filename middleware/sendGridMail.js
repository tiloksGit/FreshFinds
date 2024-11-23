const sgMail = require("@sendgrid/mail");

// Set your API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Generate a random 4-digit code
const mailChecker = async (msg) => {
  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
    return true; // Success
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Failure
  }
};

module.exports = mailChecker;
