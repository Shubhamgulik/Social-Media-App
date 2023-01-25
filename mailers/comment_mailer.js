const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log("Comment in mailer : ",comment);
    // send mail with defined transport object
  nodeMailer.transporter.sendMail({
    from: 'striver.pubg@gmail.com', // sender address
    to: comment.user.email, // list of receivers
    subject: "New Comment Published", // Subject line
    // text: "Hello world?", // plain text body
    html: "<h1>Hey, New comment added successfully!!!</h1>", // html body
  },(err,info)=>{
    if(err){console.log("Error in sending email: ",err); return; }

    console.log("Message sent: ",info);
    return;
  });

}