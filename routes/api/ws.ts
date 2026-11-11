import { define } from "@/utils.ts";

// Cria e deleta instâncias de WebSocket, com o intuito
// de permitir que exista uma comunicação bidirecional
// entre servidor e cliente.
//
// Essa conexão bidirecional permite que o servidor
// envie atualizações das suas tabelas do banco de dados
// aos clientes sem que estes tenham que recarregar
// páginas inteiras.
export const handler = define.handlers(
  {
    GET(ctx) {
      return ctx.upgrade({
        open(socket) {
          ctx.state.websockets.add(socket);
        },
        close(socket) {
          ctx.state.websockets.delete(socket);
        },
        error(socket) {
          ctx.state.websockets.delete(socket);
        },
      });
    },
  },
);
