import streamlit as st
from generator import generate_message

st.set_page_config(page_title="WhatsApp CRM Message Generator", page_icon="💬", layout="centered")

st.title("💬 WhatsApp CRM Message Generator")
st.write("Generate predefined messages using a simple prompt. You can later personalize with placeholders like `{name}`.")

prompt = st.text_area("Enter your prompt", placeholder="e.g. I want to send Diwali greetings to my customers")
tone = st.selectbox("Select Tone", ["friendly", "formal", "playful", "concise"])
use_llm = st.checkbox("Use LLM (OpenAI API Key required)", value=False)

if st.button("Generate Message"):
    if not prompt.strip():
        st.warning("Please enter a prompt.")
    else:
        msg = generate_message(prompt, tone, use_llm)
        st.success("Generated Message:")
        st.text_area("Message", msg, height=100)
