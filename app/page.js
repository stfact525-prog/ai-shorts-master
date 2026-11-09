
"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const [duration, setDuration] = useState("30");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateScript() {
    if (!topic.trim()) {
      setError("पहले वीडियो का विषय लिखें।");
      return;
    }

    setLoading(true);
    setError("");
    setScript("");

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language, duration })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Script नहीं बन सकी।");
      }

      setScript(data.script);
    } catch (err) {
      setError(err.message || "कुछ गड़बड़ हुई।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      maxWidth: "650px",
      margin: "40px auto",
      padding: "24px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>AI Shorts Master</h1>
      <h2>AI Script Generator</h2>

      <label>वीडियो का विषय</label>
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="जैसे: अंतरिक्ष के 5 रोचक तथ्य"
        rows={4}
        style={{ width: "100%", padding: "12px", margin: "12px 0" }}
      />

      <label>भाषा</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ display: "block", padding: "10px", margin: "10px 0" }}
      >
        <option value="Hindi">Hindi</option>
        <option value="English">English</option>
      </select>

      <label>वीडियो की अवधि</label>
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ display: "block", padding: "10px", margin: "10px 0 20px" }}
      >
        <option value="30">30 सेकंड</option>
        <option value="60">60 सेकंड</option>
      </select>

      <button
        onClick={generateScript}
        disabled={loading}
        style={{ padding: "13px 22px", cursor: "pointer" }}
      >
        {loading ? "बन रही है..." : "Generate Script"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {script && (
        <section style={{ marginTop: "25px" }}>
          <h2>आपकी स्क्रिप्ट</h2>
          <pre style={{
            whiteSpace: "pre-wrap",
            background: "#f1f1f1",
            color: "#111",
            padding: "16px"
          }}>
            {script}
          </pre>
          <button onClick={() => navigator.clipboard.writeText(script)}>
            Copy Script
          </button>
        </section>
      )}
    </main>
  );
}
