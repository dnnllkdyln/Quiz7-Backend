exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      status: "Backend is running",
      service: "Talent Form API",
      timestamp: new Date().toISOString()
    })
  };
};