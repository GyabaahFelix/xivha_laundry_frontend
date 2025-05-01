import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    serviceId: v.id("services"),
    items: v.number(),
    totalAmount: v.number(),
    notes: v.optional(v.string()),
    scheduledDate: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("orders", {
      ...args,
      userId,
      status: "pending",
    });
  },
});

export const updateStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const order = await ctx.db.get(args.orderId);
    if (!order || order.userId !== userId) {
      throw new Error("Order not found");
    }
    return await ctx.db.patch(args.orderId, { status: args.status });
  },
});
