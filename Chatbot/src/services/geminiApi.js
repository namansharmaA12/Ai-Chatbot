const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `${import.meta.env.VITE_GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

export const generateContent = async (message) => {
  if (!GEMINI_API_KEY || !GEMINI_API_URL) {
    throw new Error("GEMINI_API_KEY or GEMINI_API_URL is not defined in .env");
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!data || !data.candidates || data.candidates.length === 0) {
      throw new Error("No candidate found in the response");
    }

    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};
