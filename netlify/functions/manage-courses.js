
exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const { password, title, type, desc } = JSON.parse(event.body);
    
    // This reads the hidden password from your Netlify dashboard securely
    const ADMIN_SECURE_KEY = process.env.ADMIN_SECRET_PASSWORD;

    if (!ADMIN_SECURE_KEY || password !== ADMIN_SECURE_KEY) {
      return { 
        statusCode: 401, 
        body: JSON.stringify({ error: "Access Denied: Invalid Password." }) 
      };
    }

    // Success handshake back to your index.html front-end
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Verified", title, type, desc })
    };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
};
