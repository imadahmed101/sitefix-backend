const nodemailer = require('nodemailer')

exports.generateOTP = () => {
            let otp =''
            for(let i=0; i<= 3; i++){
                const randomValue = Math.round(Math.random() *9)
                otp = otp + randomValue
            }
            return otp;
        }

exports.mailTransport = () => nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD
        }
      });

exports.generateEmailTemplate = code => {
    return`

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge">
            <style>
                @media only screen and (max-width: 620px){
                    h1{
                        font-size: 20px;
                        padding: 5px;
                    }
                }
            </style>
        </head>
        <body>
        <div>
        <h1>Welcome to Sitefix!</h1>
        <p>Please verify your account with the following code ${code}</p>
        </div>
        </body>
    </html>
`
}

exports.generateVerifiedEmailTemplate = () => {
    return`

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge">
            <style>
                @media only screen and (max-width: 620px){
                    h1{
                        font-size: 20px;
                        padding: 5px;
                    }
                }
            </style>
        </head>
        <body>
        <div>
        <h1>Welcome to Sitefix!</h1>
        <p>Your account has been successfully verified, Thanks.</p>
        </div>
        </body>
    </html>
`
}

exports.generatePasswordChangedTemplate = () => {
    return`

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge">
            <style>
                @media only screen and (max-width: 620px){
                    h1{
                        font-size: 20px;
                        padding: 5px;
                    }
                }
            </style>
        </head>
        <body>
        <div>
        <h1>Welcome to Sitefix!</h1>
        <p>Your password has been successfully changed, Thanks.</p>
        </div>
        </body>
    </html>
`
}