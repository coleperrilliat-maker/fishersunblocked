export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const proxyHost = url.host; // Your proxy domain (e.g., myproxy.workers.dev)
    const targetUrl = 'https://www.roblox.com' + url.pathname + url.search;

    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      redirect: 'follow'
    });

    let response = await fetch(modifiedRequest);
    const contentType = response.headers.get('content-type') || '';

    // Only rewrite if the content is HTML
    if (contentType.includes('text/html')) {
      return new HTMLRewriter()
        .on('a', { // Find all <a> tags
          element(el) {
            const href = el.getAttribute('href');
            if (href && href.includes('roblox.com')) {
              // Rewrite the link to stay on your proxy domain
              el.setAttribute('href', href.replace(/https?:\/\/(www\.)?roblox\.com/g, `https://${proxyHost}`));
            }
          }
        })
        .on('form', { // Find all forms (login, search, etc.)
          element(el) {
            const action = el.getAttribute('action');
            if (action && action.includes('roblox.com')) {
              el.setAttribute('action', action.replace(/https?:\/\/(www\.)?roblox\.com/g, `https://${proxyHost}`));
            }
          }
        })
        .transform(response);
    }

    return response;
  }
};
