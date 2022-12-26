const dotenv = require('dotenv');
dotenv.config();

const API_KEY = '0f914c2d213c9e4797253708d3467ea4-f2340574-05b41b37';
const DOMAIN = 'sandbox877bfdf997004003b5b0355937708506.mailgun.org';

const mailgun = require('mailgun-js')
       ({apiKey: API_KEY, domain: DOMAIN});


module.exports.sendEmail =async function ({to,from,subject,text,html}) {
  const ms={to,from,subject,text,html}
    try {
      await mailgun.messages().send(ms, function (error, body) {
        if(error) console.log(error)
        else console.log(body);
      });
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
}
