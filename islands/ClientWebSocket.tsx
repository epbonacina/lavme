import { useEffect } from "preact/hooks";
import { ISLAND_CHANNEL_NAME } from "@/utils.ts";

// "ClientWebSocket" é um componente reativo ("Island") que se
// responsabiliza por instanciar no cliente um websocket que
// o permita se comunicar com o servidor.
//
// Essa implementação permite que apenas um "websocket" seja
// instanciado por página carregada, independemente da
// quantidade de "islands" que precisem se comunicar com o
// servidor.
export default function ClientWebSocket() {
  useEffect(() => {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${protocol}//${location.host}/ws`);

    // A melhor maneira que encontrei para compartilhar esse
    // websocket entre todas as "islands" foi o uso de
    // "BroadcastChannel", um mecanismo disponibilizado pelos
    // navegadores.
    // O "BroadcastChannel" permite que diferentes janelas, abas
    // ou "iframes" da mesma origem se comuniquem.
    const channel = new BroadcastChannel(ISLAND_CHANNEL_NAME);

    ws.onmessage = (event) => {
      // Envia a mensagem para que as "islands" interessadas
      // possam lê-la.
      channel.postMessage(JSON.parse(event.data));
    };

    ws.onerror = (error) => console.error("WebSocket Master Error:", error);

    return () => {
      ws.close();
      channel.close();
    };
  }, []);

  return null;
}
