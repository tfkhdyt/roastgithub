import { genAI } from ".";

export async function generateAnswer<T>({
  username,
  location,
  readme,
  data,
}: {
  username: string;
  location: string | null;
  readme: string | null;
  data: T;
}) {
  let prompt = `Berikan roasting singkat dengan kejam dan menyindir dalam bahasa gaul untuk profile github berikut: ${username}. Berikut detailnya: "${JSON.stringify(data)}"`;
  if (location && !location.includes("Indonesia")) {
    prompt = `Give a short and harsh roasting for the following github profile: ${username}. Here are the details: "${JSON.stringify(data)}"`;
  }

  if (readme) {
    prompt += ", Profile Markdown: ```" + readme + "```";
  } else {
    prompt += `, Profile Markdown: Not Found`;
  }

  if (location && location.includes("Indonesia")) {
    prompt += `. (Berikan response dalam bahasa indonesia dan jangan berikan pujian atau saran serta jangan berikan kata-kata terlalu kasar)`;
  } else {
    prompt += `. (Provide the response in English and do not provide praise or advice and do not use explicit words)`;
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return response;
}
