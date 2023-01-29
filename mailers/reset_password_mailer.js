const nodeMailer = require('../config/nodemailer');

exports.resetPassword = (token) => { 
   
    let htmlString = nodeMailer.renderTemplate({token : token},'/password/reset_password.ejs');
  
  // send mail with defined transport object 
    nodeMailer.transporter.sendMail({
    from: 'striver.pubg@gmail.com', // sender address
    to: token.user.email, // list of receivers
    subject: "Reset your Password", // Subject line
    // text: "Hello world?", // plain text body
    html: htmlString,
  },(err,info)=>{
    if(err){console.log("Error in sending email: ",err); return; }

    console.log("*************Message sent ");
    return;
  });

}