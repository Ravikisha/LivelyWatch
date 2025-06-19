export function injectReloadScript(content: string): string {
  const snippet = `
    <script>
      (() => {
        const ws = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host);

        ws.onopen = () => {
          console.log("WebSocket connection established.");
        };
        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        ws.onmessage = (event) => {
          if (event.data === "reload") {
            console.log("Reloading page due to file change...");
            location.reload();
          } else if (event.data === "reload-css") {
            const links = document.querySelectorAll("link[rel=stylesheet]");
            links.forEach(link => {
              const href = link.getAttribute("href");
              if (href) {
                const newHref = href.split("?")[0] + "?t=" + Date.now();
                link.setAttribute("href", newHref);
              }
            });
          }
        };
      })();
    </script>
  `;

  if (content.includes("</body>")) {
    return content.replace("</body>", snippet + "</body>");
  } else if (content.includes("</html>")) {
    return content.replace("</html>", snippet + "</html>");
  } else {
    return content + snippet;
  }
}
