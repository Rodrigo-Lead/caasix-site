import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());           // Se quiser restringir, trocar por: cors({ origin: 'https://seusite.com' })
app.use(express.json());

app.post("/gerar-roteiro", async (req, res) => {
  const { ideia } = req.body;
  if (!ideia || typeof ideia !== "string") {
    return res.status(400).json({ error: "Campo 'ideia' é obrigatório (string)." });
  }

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você é um roteirista criativo que cria roteiros curtos, claros e divididos por cenas para vídeos institucionais, comerciais e reels." },
          { role: "user", content: `Minha ideia é: ${ideia}. Gera um roteiro dividido por cenas (CENA 1, CENA 2...), com 1-2 linhas por cena, indicação de tempo aproximado e uma CTA curta ao final.` }
        ],
        max_tokens: 500,
        temperature: 0.8
      })
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("OpenAI error:", data);
      return res.status(500).json({ error: "Erro da API OpenAI", detail: data });
    }

    const roteiro = data?.choices?.[0]?.message?.content ?? "Sem resposta da API";
    res.json({ roteiro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno ao gerar roteiro" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
