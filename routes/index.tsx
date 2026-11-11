import { ClientRepository, PersistedClient } from "@/database/models/client.ts";
import { ClientCard } from "@/components/ClientCard.tsx";
import { db } from "@/database/index.ts";
import { define } from "../utils.ts";

export default define.page(function Home(ctx) {
  const repo = new ClientRepository(db);
  const result = repo.select();
  const clients = result.success ? result.value : [];
  return (
    <div>
      <a href="/clientForm">+Client</a>
      <h1>All Registered Clients</h1>
      <ol>
        {clients.map((client: PersistedClient) => (
          <li>
            <ClientCard client={client} />
          </li>
        ))}
      </ol>
    </div>
  );
});
