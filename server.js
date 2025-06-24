require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));

// ⚠️ Agrega la URL de tu frontend en Netlify
app.use(cors({
  origin: 'https://login-dwfsp.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Solo si usas cookies/sesiones
}));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conexión a MongoDB establecida'))
.catch(err => console.error('Error conectando a MongoDB:', err));

app.use(express.json());
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../Frontend/public')));

app.use('/api', authRoutes);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../Frontend/views/index.html'));
// });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
