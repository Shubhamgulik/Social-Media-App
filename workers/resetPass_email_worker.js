const queue = require('../config/kue');

const resetPassMailer = require('../mailers/reset_password_mailer');

queue.process('reset_pass',function(job,done){
    console.log("Processing the job : ",job.data);

    resetPassMailer.resetPassword(job.data); 

    done();
})
  