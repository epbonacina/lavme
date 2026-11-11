import { PersistedClient } from "@/database/models/client.ts";

export interface ClientCardProps {
  client: PersistedClient;
}

export function ClientCard(props: ClientCardProps) {
  const client = props.client;
  return (
    <div>
      <p>{client.name}</p>
      <p>{client.address}</p>
      <p>{client.phone}</p>
    </div>
  );
}
