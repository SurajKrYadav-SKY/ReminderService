const bodyParser = require("body-parser");
const express = require("express");
const { PORT } = require("./config/serverConfig");

// const { sendBasicEmail } = require("./services/email-service");

const setupAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log("Server started at port:", PORT);

    // sendBasicEmail(
    //   "support@admin.com",
    //   "backendstudies@gmail.com",
    //   "This is a testing number 3 email",
    //   "This is the third test with another email"
    // );
  });
};

setupAndStartServer();
