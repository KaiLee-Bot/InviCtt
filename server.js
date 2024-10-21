const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
    const { gmail } = req.body;

    if (!gmail) {
        return res.status(400).json({ message: "Gmail não fornecido" });
    }

    // Configuração do transporte para envio de email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'n35250352@gmail.com',
            pass: 'muleke21'
        }
    });

    const emailContent = [
        {
            to: gmail,
            subject: 'Instrução 1',
            text: 'Aqui está a primeira instrução...'
        },
        {
            to: gmail,
            subject: 'Instrução 2',
            text: 'Aqui está a segunda instrução...'
        }
    ];

    emailContent.forEach(email => {
        transporter.sendMail(email, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Erro ao enviar email" });
            }
        });
    });

    res.status(200).json({ message: "Emails enviados com sucesso!" });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
