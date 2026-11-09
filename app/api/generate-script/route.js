
export async function POST(request) {
  try {
    const { topic, language = "Hindi", duration = 30 } =
      await request.json();

    if (!topic || !topic.trim()) {
      return Response.json(
        { error: "Please enter a video topic." },
        { status: 400 }
      );
    }

    const script = `वीडियो विषय: ${topic}

भाषा: ${language}
अवधि: ${duration} सेकंड

HOOK:
क्या आप जानते हैं ${topic} के बारे में एक दिलचस्प बात?

MAIN SCRIPT:
आज हम जानेंगे ${topic} के बारे में।
इस विषय की सबसे खास बात यह है कि इसमें कई रोचक तथ्य छिपे हैं।
इसे अंत तक जरूर देखिए।

ENDING:
वीडियो पसंद आया हो तो Like और Subscribe करें!`;

    return Response.json({
      success: true,
      topic,
      language,
      duration,
      script
    });
  } catch (error) {
    return Response.json(
      { error: "Script generation failed." },
      { status: 500 }
    );
  }
}
