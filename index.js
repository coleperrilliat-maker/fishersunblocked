export default {
  async fetch(request) {
    const targetUrl = "https://universityequality.com";
    
    // 1. Fetch the actual game page
    let response = await fetch(targetUrl, {
      headers: request.headers
    });

    // 2. Make the response editable
    let newHeaders = new Headers(response.headers);
    
    // 3. REMOVE the security headers that cause the "Refused to Connect" error
    newHeaders.delete("X-Frame-Options");
    newHeaders.delete("Content-Security-Policy");
    
    // 4. Add headers to allow it to be framed anywhere
    newHeaders.set("Access-Control-Allow-Origin", "*");

    // 5. Return the "cleaned" page to your browser
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};
