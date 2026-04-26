const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

exports.handler = async (event) => {

  // ✅ Handle preflight (VERY IMPORTANT)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  try {
    let body;

    try {
      body = JSON.parse(event.body);
    } catch {
      return{
        statusCode: 400,
        headers,
        body:JSON.stringify({error: "Invalid JSON format"})
      };
    }

    const { participantName, age, address, email, category, description } = body;

    const { data, error } = await supabase
      .from("forms")
      .insert([
        { participantName, age, address, email, category, description }
      ])
      .select();

    if (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: error.message })
      };
    }

    if (!data) {
      console.warn("Insert succeeded but no data returned");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Form submitted successfully",
        data
      })
    };

  } catch (err) {
    console.error("Server error:", err);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server error" })
    };
  }
};