const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/emailConfig");

/**
 * notification to be sent at 10:00 AM
 * will run the cron job every 5 min
 * We will check are there any pending emails which was expected to be sent by now and is pending
 */

const setupJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    // this will send a basic email
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      sender.sendMail(
        {
          to: email.recepientEmail,
          subject: email.subject,
          content: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            if (data) {
              await emailService.updateTicket(email.id, { status: "SUCCESS" });
            }
          }
        }
      );
      // emailService.sendBasicEmail(
      //   "ReminderService@gmail.com",
      //   email.recepientEmail,
      //   email.subject,
      //   email.content
      // );
    });
    console.log(response);
  });
};

module.exports = setupJobs;
