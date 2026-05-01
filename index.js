export default {
  async fetch(request) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Roblox | FishersUnblocked</title>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background: #000; }
            .container { position: relative; width: 100vw; height: 100vh; overflow: hidden; }
            /* This 'zooms' the view to hide headers and borders */
            iframe {
              position: absolute;
              top: -45px; 
              left: 0;
              width: 100%;
              height: calc(100% + 45px);
              border: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Using the direct app link for better browser compatibility -->
            <iframe 
              src="https://now.gg" 
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-presentation"
              allowfullscreen>
            </iframe>
          </div>
        </body>
      </html>
    `;
    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  }
};
