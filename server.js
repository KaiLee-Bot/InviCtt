// Importa as bibliotecas necessárias
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();  // Carrega variáveis de ambiente do arquivo .env

const app = express();
app.use(bodyParser.json());

// Rota para enviar e-mails
app.post('/send-email', (req, res) => {
    const { gmail } = req.body;  // Captura o Gmail enviado pelo cliente

    if (!gmail) {
        return res.status(400).json({ message: 'Gmail não fornecido' });
    }

    // Cria o transporte de envio de e-mail com as credenciais do Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  // Usuário do Gmail
            pass: process.env.EMAIL_PASS   // Senha do Gmail
        }
    });

    // Conteúdo do e-mail (dois e-mails com instruções)
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

    // Envia os e-mails
    emailContent.forEach(email => {
        transporter.sendMail(email, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao enviar e-mail: ' + error.message });
            }
        });
    });

    // Resposta de sucesso
    res.status(200).json({ message: 'Emails enviados com sucesso!' });
});

// Inicializa o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
