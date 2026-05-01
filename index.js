
export default {
  async fetch(request) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Educational Portal</title>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; }
            #game-container { width: 100%; height: 100%; }
          </style>
          <!-- 1. Load the official now.gg SDK -->
          <script type="text/javascript" src="https://cdn.now.gg/external/sdk/ifp-sdk-1.2.0.min.js"></script>
        </head>
        <body>
          <div id="game-container"></div>

          <script>
            // 2. Initialize the game inside your own container
            // Use the public App ID for Roblox
            NowIfp.init({
              clientId: "external_embed", 
              appId: "5349", 
              iframeParentElement: document.getElementById("game-container"),
              isNowLoginEnabled: true
            });
          </script>
        </body>
      </html>
    `;
    return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
  }
};
