import { createDefine } from "fresh";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
  websockets: Set<WebSocket>; // Maps addresses to web sockets.
}

export const ISLAND_CHANNEL_NAME = "db-updates";

export const define = createDefine<State>();
