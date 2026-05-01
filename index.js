export default {
  async fetch(request) {
    const targetUrl = "https://now.gg";

    // 1. Fetch the actual content from now.gg
    let response = await fetch(targetUrl, {
      headers: {
        "User-Agent": request.headers.get("User-Agent"),
        "Accept": request.headers.get("Accept")
      }
    });

    // 2. Clone the response so we can modify the headers
    let newHeaders = new Headers(response.headers);
    
    // 3. Delete the headers that block your site from showing the game
    newHeaders.delete("X-Frame-Options");
    newHeaders.delete("Content-Security-Policy");
    
    // 4. Tell the browser it's okay to show this content on your domain
    newHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};
