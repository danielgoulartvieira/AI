const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: 'ai.env' });

const app = express();
app.use(cors()); 
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

// Rota de Texto e Mensagem (v1 Estável)
app.post('/api/generate', async (req, res) => {
    try {
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro na conexão com Google" });
    }
});

// Rota de Imagem (v1beta Necessária para Imagen 3)
app.post('/api/predict', async (req, res) => {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${API_KEY}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao gerar imagem" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor Gläub+ Ativo`));
