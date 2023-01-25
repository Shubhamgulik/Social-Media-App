

const nodemailer = require("nodemailer");
const path = require('path');
const ejs = require('ejs');

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount =  nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'striver.pubg@gmail.com', // generated ethereal user
      pass: 'zxnxzbygsvbuqscn', // generated ethereal password
    },
  });

  // Rendering the template
  let renderTemplate = (data,relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log("Error in rendering template : ",err); return;}
            mailHtml = template;
        }
    )
    return mailHtml;
  }

  module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate,
  }
// }

// main().catch(console.error);
