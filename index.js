const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const port = process.env.PORT || '3000'
app.listen(port, () => {
    console.log("The server started on port 3000");
});
app.get("/", (req, res) => {
    res.send("Welcome to FlyHigh Project");
});



app.post("/sendmail", (req, res) => {
    try {
        console.log("request came");
        console.log(req.body);
        let input = req.body;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            auth: {
                user: "akki719871@gmail.com",
                pass: "Dyansh@1234"
            }
        });

        //, 'bhuppi890109@gmail.com'

        let mailOptions = {
            from: '"Ankit Gupta"<akki719871@gmail.com>',
            to: ['akki.gupta20@gmail.com'],
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

        transporter.sendMail(mailOptions).then((info) => {
            console.log(info);
            res.send(info);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });

        // sendMail(input, info => {
        //     console.log("Email has been sent");
        //     res.send(info);

        // });
    } catch (err) {
        console.log('error in email sending');
        console.log(err);
    }
});

async function sendMail(input, callback) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
            user: "akki719871@gmail.com",
            pass: "Dyansh@1234"
        }
    });
    //, 'bhuppi890109@gmail.com'

    let mailOptions = {
        from: '"Ankit Gupta"<akki719871@gmail.com>',
        to: ['akki.gupta20@gmail.com'],
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

    let info = await transporter.sendMail(mailOptions).then().catch();
    callback(info);
}