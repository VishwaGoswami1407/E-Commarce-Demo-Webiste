const nodeEmailer = require('nodemailer');

const sendEmail = async(userEmail,productArray)=>{

    const transporter = nodeEmailer.createTransport({
        service :'gmail',
        auth:{
            user: process.env.NODE_EMAIL,
            pass : process.env.NODE_PASS
        }
    });

    //prepare product details in text format
    const productDetails = productArray.map((product, index)=>
        `${index +1}.Name: ${product.name}.Price: ${product.price}`
    )
    //setup mail content
    const mailOptions = {
        from:process.env.NODE_EMAIL,
        to:userEmail,
        subject: "Your order details",
        text:`Thanks for your purchase! \n\n here is your product details ${productDetails}`
    }
    try{
      await transporter.sendMail(mailOptions);

    }catch(e){
        console.log(e);
    }
}

module.exports = sendEmail;