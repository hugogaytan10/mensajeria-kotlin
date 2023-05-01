const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

// Configurar Firebase Admin SDK con la clave privada descargada
const serviceAccount = require('./Clave.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Configurar el servidor Express
const app = express();
app.use(bodyParser.json());

// Ruta para recibir un token de un cliente Android
app.post('/registerToken', (req, res) => {
    const token = req.body.token;
    console.log(`Token recibido: ${token}`);

    // Guardar el token en una base de datos
    // ...

    res.sendStatus(200);
});

// Función para enviar un mensaje push a través de FCM
function enviarMensajePush(token, title, body) {
    const message = {
        notification: {
            title: title,
            body: body
        },
        token: token
    };

    admin.messaging().send(message)
        .then((response) => {
            console.log('Mensaje enviado:', response);
        })
        .catch((error) => {
            console.error('Error al enviar mensaje:', error);
        });
}

// Ejemplo de uso de la función para enviar un mensaje push a un token específico
enviarMensajePush('ejemplo-token', 'Título del mensaje', 'Cuerpo del mensaje');

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
