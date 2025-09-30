// components/MessageGenerator.jsx
import React, { useState } from "react";
import axios from "axios";

export default function MessageGenerator({ onInsert }) {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("friendly");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tokens, setTokens] = useState([]);

  const generate = async (useLLM = false) => {
    setLoading(true);
    try {
      const resp = await axios.post("/api/generate-message", {
        prompt,
        tone,
        useLLM
      });
      setMessage(resp.data.message || "");
      setTokens(resp.data.tokens || []);
    } catch (err) {
      console.error(err);
      alert("Could not generate message. Try fallback or check server logs.");
    } finally {
      setLoading(false);
    }
  };

  const insertToken = (tok) => {
    // insert token at cursor position in message box (simple append for now)
    setMessage((m) => (m ? m + " " + tok : tok));
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h4>Generate Message</h4>
      <textarea
        rows={3}
        placeholder="Describe purpose e.g. 'Diwali wish for customers, polite, short'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="friendly">Friendly</option>
          <option value="formal">Formal</option>
          <option value="playful">Playful</option>
          <option value="concise">Concise</option>
        </select>
        <button onClick={() => generate(false)} disabled={loading}>
          Generate (Local)
        </button>
        <button onClick={() => generate(true)} disabled={loading}>
          Generate (LLM)
        </button>
      </div>

      <div>
        <label>Generated message</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        {tokens.length > 0 && (
          <>
            <small>Placeholders:</small>
            <div>
              {tokens.map((t) => (
                <button
                  key={t}
                  onClick={() => insertToken(t)}
                  style={{ marginRight: 6 }}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onInsert(message)}>Insert into composer</button>
        <button onClick={() => navigator.clipboard.writeText(message)}>
          Copy
        </button>
      </div>
    </div>
  );
}
