export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // This directs all traffic to the official Roblox site
    const targetUrl = 'https://www.roblox.com' + url.pathname + url.search;

    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow'
    });

    // Fetch from Roblox and return the response to the user
    let response = await fetch(modifiedRequest);

    // Return the response as-is (this handles images, CSS, and basic HTML)
    return response;
  }
};
