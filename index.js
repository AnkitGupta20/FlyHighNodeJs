const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("The server started on port 3000");
});

app.post("/sendmail", (req, res) => {
    console.log("request came");
    console.log(req.body);
    let input = req.body;

    sendMail(input, info => {
        console.log("Email has been sent");
        res.send(info);

    });
});

async function sendMail(input, callback) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "akki719871@gmail.com",
            pass: "Dyansh@1234"
        }
    });

    let mailOptions = {
        from: '"Ankit Gupta"<akki719871@gmail.com>',
        to: 'akki.gupta20@gmail.com',
        subject: input.subject,
        html: `<div>
        <font face="georgia, serif">Hi Team,</font>
        <div>
            <font face="georgia, serif"><br></font>
        </div>
        <div>
            <font face="georgia, serif">We have got the interest from client and his details are as follow.</font>
        </div>
        <div>
            <font face="georgia, serif"><br></font>
        </div>
        <div>
            <font face="georgia, serif">Name: ${input.name}</font>
        </div>
        <div>
            <font face="georgia, serif">Email: ${input.email}</font>
        </div>
        <div>
            <font face="georgia, serif">Contact Number: ${input.phone}</font>
        </div>
        <div>
            <font face="georgia, serif">Reason: ${input.message}</font>
        </div>
        <div>
            <font face="georgia, serif"><br></font>
        </div>
        <div>
            <font face="georgia, serif">Regards,</font>
        </div>
        <div><b>
                <font face="georgia, serif">Flyhigh Team</font>
            </b></div>
    </div>`
    }

    let info = transporter.sendMail(mailOptions);
    callback(info);
}