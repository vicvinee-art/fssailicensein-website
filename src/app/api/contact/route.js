import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const requestCallback = "Request Callback";

    await db.collection("contacts").insertOne({
      name,
      email,
      phone,
      requestCallback,
      createdAt: new Date(), // ✅ kept as requested
    });

    await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        requestCallback,
        createdAt: new Date(), // ✅ also sending to sheet
      }),
    });

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });

  } catch (error) {
    console.error("ERROR:", error);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
