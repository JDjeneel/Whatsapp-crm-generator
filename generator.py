import random
import re
import os
import openai

# Use OpenAI key if available
openai.api_key = os.getenv("OPENAI_API_KEY", None)

TEMPLATES = {
    "friendly": [
        "Hello {name}, Diwali greetings! Wishing you bright days and many smiles. Namaste!",
        "Hi {name} — Warm Diwali wishes to you and yours. May your home glow with joy.",
        "Namaste {name}! On this Diwali, may fortune favor your doorstep with light and happiness.",
        "Hey {name}, sparkle and joy this Diwali — warm wishes from all of us!",
        "Good day {name}, as lamps gleam this Diwali, may prosperity knock at your door. Regards!"
    ],
    "formal": [
        "Dear {name}, Warm Diwali greetings from our team. Wishing you prosperity and good health."
    ],
    "playful": [
        "Yo {name}! Happy Diwali 🎆 — may your sweets be sweet and your lights brighter!"
    ],
    "concise": [
        "Hi {name}, Happy Diwali! Best wishes for the season."
    ]
}

def fallback_generate(prompt, tone="friendly"):
    pool = TEMPLATES.get(tone, TEMPLATES["friendly"])
    return random.choice(pool)

def llm_generate(prompt, tone="friendly"):
    if not openai.api_key:
        return fallback_generate(prompt, tone)

    resp = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You generate short WhatsApp messages with {name} placeholder. Max 30 words. Avoid generic phrasing."},
            {"role": "user", "content": f"Prompt: {prompt}\nTone: {tone}"}
        ],
        max_tokens=120,
        temperature=0.7
    )
    text = resp.choices[0].message["content"].strip()
    # Ensure placeholder is present
    if "{name}" not in text:
        text = "Hello {name}, " + text
    return text

def generate_message(prompt, tone="friendly", use_llm=False):
    if use_llm:
        return llm_generate(prompt, tone)
    return fallback_generate(prompt, tone)
