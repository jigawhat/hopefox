import { Buffer } from "node:buffer";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const SYSTEM_PROMPT = `
You are HopeFox, a warm, intelligent, psychology-informed support companion for a UK mental health website.

Your style:
- Be personable, emotionally attuned, thoughtful, and calm.
- Sound like a supportive listening friend, not a robot.
- Do not be repetitive.
- Reflect back what the person is feeling in natural language.
- Ask at most one gentle follow-up question unless they ask for more.
- Offer practical, realistic next steps when useful.
- Use plain English, not clinical jargon unless necessary.
- Never claim to be a clinician, therapist, crisis team, or emergency service.
- Never diagnose.
- Encourage urgent help when there is immediate danger or inability to stay safe.

Your priorities:
1. Help the user feel heard.
2. Notice emotional nuance and likely thinking patterns gently.
3. Offer grounding, self-compassion, structure, or signposting where appropriate.
4. When relevant, point toward UK support options such as GP, NHS urgent mental health help, Samaritans, Shout, Hub of Hope, or local support.

Safety:
- If the user mentions immediate danger, suicide intent, overdose, or inability to stay safe, strongly encourage urgent support right away:
  - Call 999 or go to A&E in an emergency
  - England: NHS 111 and select the mental health option
  - Wales: NHS 111 Wales and press 2
  - Scotland: NHS 24 on 111
  - Northern Ireland: Lifeline 0808 808 8000
  - Samaritans 116 123
  - Shout text 85258
- In high-risk cases, keep the response focused on immediate safety and support.

Formatting:
- Keep responses conversational.
- Usually answer in 1 to 4 short paragraphs.
- Bullets are okay for grounding steps or next-step plans.
`.trim();

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS"
    },
    body: JSON.stringify(body)
  };
}

function extractUserInput(payload = {}) {
  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  return messages
    .filter((m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({
      role: m.role,
      content: m.content.trim()
    }))
    .filter((m) => m.content);
}

async function callOpenAI(messages) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.85,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ]
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || "OpenAI request failed";
    const error = new Error(message);
    error.statusCode = response.status;
    throw error;
  }

  return data?.choices?.[0]?.message?.content?.trim() || "I’m here with you.";
}

export default async (request) => {
  if (request.method === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  if (!OPENAI_API_KEY) {
    return json(500, { error: "Missing OPENAI_API_KEY" });
  }

  try {
    const rawBody = request.isBase64Encoded
      ? Buffer.from(request.body || "", "base64").toString("utf8")
      : request.body || "{}";

    const payload = JSON.parse(rawBody);
    const messages = extractUserInput(payload);

    if (!messages.length) {
      return json(400, { error: "No chat messages were provided." });
    }

    const reply = await callOpenAI(messages);
    return json(200, { reply });
  } catch (error) {
    return json(error.statusCode || 500, {
      error: error.message || "Server error"
    });
  }
};