const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega a chave que está configurada no painel do Render
dotenv.config({ path: 'ai.env' });

const app = express();
app.use(cors()); 
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

// Rota para Texto e Áudio (TTS)
// Usando o modelo 2.0 Flash que suporta saída de áudio nativa
app.post('/api/generate', async (req, res) => {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Erro na rota generate:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// Rota para Imagens (Imagen 3)
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
        console.error("Erro na rota predict:", error);
        res.status(500).json({ error: "Erro ao processar imagem" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Gläub+ Backend rodando na porta ${PORT}`);
});
