import { ClientRepository } from "@/database/models/client.ts";
import { db } from "@/database/index.ts";
import { define } from "../utils.ts";

export const handler = define.handlers({
  async POST(ctx) {
    const form = await ctx.req.formData();
    const name = (form.get("name") ?? "").toString();
    const address = (form.get("address") ?? "").toString();
    const phone = (form.get("phone") ?? "").toString();

    const repo = new ClientRepository(db);
    repo.insert({ name, address, phone });

    const headers = new Headers();
    headers.set("location", "/");
    return new Response(
      "",
      {
        status: 307,
        headers,
      },
    );
  },
});

export default define.page(function Home(ctx) {
  return (
    <>
      <h1>Register a new client</h1>
      <form method="post">
        <input type="text" name="name" />
        <input type="text" name="address" />
        <input type="text" name="phone" />
        <button type="submit">Register</button>
      </form>
    </>
  );
});
