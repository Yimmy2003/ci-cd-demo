const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: '¡Hola! Esta es una aplicación desplegada con Jenkins y Docker. [v2 - Auto-deploy via SCM polling]',
    version: process.env.APP_VERSION || '2.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
