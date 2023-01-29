const queue = require('../config/kue');

const commentsMailer = require('../mailers/comment_mailer');

queue.process('emails',function(job,done){
    console.log("Processing the job : ",job.data);

    commentsMailer.newComment(job.data);  

    done(); 
})
