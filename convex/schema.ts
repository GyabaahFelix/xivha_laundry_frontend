import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  services: defineTable({
    name: v.string(),
    price: v.number(),
    description: v.string(),
    estimatedTime: v.number(), // in hours
  }),
  orders: defineTable({
    userId: v.id("users"),
    serviceId: v.id("services"),
    status: v.string(), // pending, processing, completed, cancelled
    items: v.number(),
    totalAmount: v.number(),
    notes: v.optional(v.string()),
    scheduledDate: v.number(),
  }).index("by_user", ["userId"]),
  deliveries: defineTable({
    orderId: v.id("orders"),
    userId: v.id("users"),
    status: v.string(), // pending, in_transit, delivered
    address: v.string(),
    scheduledDate: v.number(),
  }).index("by_user_and_status", ["userId", "status"]),
  settings: defineTable({
    userId: v.id("users"),
    notifications: v.boolean(),
    preferredPayment: v.string(),
    defaultAddress: v.string(),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
