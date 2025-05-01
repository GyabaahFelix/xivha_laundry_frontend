import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db
      .query("deliveries")
      .withIndex("by_user_and_status", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    orderId: v.id("orders"),
    address: v.string(),
    scheduledDate: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("deliveries", {
      ...args,
      userId,
      status: "pending",
    });
  },
});
