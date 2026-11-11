import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  fullName: text().notNull(),
  username: text().notNull().unique(),
  passwordHash: text().notNull(),
  salt: text().notNull(),
});

export const auditLogsTable = sqliteTable("auditLogs", {
  id: int().primaryKey({ autoIncrement: true }),
  entityName: text().notNull(),
  entityId: int().notNull(),
  action: text({ enum: ["ANONYMIZE", "CREATE", "UPDATE", "DELETE"] }).notNull(),
  userId: int().notNull().references(() => usersTable.id),
  metadata: text(),
  timestamp: text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export enum BillingRegime {
  ForEachServiceProvided = "A cada prestação de serviço",
  Monthly = "Mensal",
}

export const clientsTable = sqliteTable("clients", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  cpfOrCnpj: text().unique(),
  birthday: text(),
  billingFrequency: text({
    enum: Object.values(BillingRegime) as [BillingRegime, ...BillingRegime[]],
  }).notNull().default(BillingRegime.ForEachServiceProvided),
});

export enum ContactType {
  Telefone = "Telefone",
  Email = "E-mail",
  WhatsApp = "WhatsApp",
}

export const contactInformationsTable = sqliteTable("contactInformations", {
  id: int().primaryKey({ autoIncrement: true }),
  clientId: int().notNull().references(() => clientsTable.id),
  type: text({
    enum: Object.values(ContactType) as [ContactType, ...ContactType[]],
  }).notNull(),
  value: text().notNull(),
  acceptsNotifications: int({ mode: "boolean" }).notNull().default(false),
});

export const addressesTable = sqliteTable("addresses", {
  id: int().primaryKey({ autoIncrement: true }),
  clientId: int().notNull().references(() => clientsTable.id),
  cep: text().notNull(),
  streetName: text().notNull(),
  number: text().notNull(),
  complement: text(),
  neighborhood: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  acceptsDeliveries: int({ mode: "boolean" }).notNull().default(true),
  acceptsPickup: int({ mode: "boolean" }).notNull().default(true),
});
