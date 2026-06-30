import { integer } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const plans = pgTable("plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  interval: text("interval", { enum: ["monthly", "yearly"] }).notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  planId: uuid("plan_id")
    .notNull()
    .references(() => plans.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status", { enum: ["active", "canceled", "expired"] })
    .default("active")
    .notNull(),
});
