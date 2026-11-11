import { define } from "../utils.ts";
import ClientWebSocket from "../islands/ClientWebSocket.tsx";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>lavme</title>
      </head>
      <body>
        <ClientWebSocket />
        <Component />
      </body>
    </html>
  );
});
