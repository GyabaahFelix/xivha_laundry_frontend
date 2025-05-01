import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    return settings;
  },
});

export const save = mutation({
  args: {
    notifications: v.boolean(),
    preferredPayment: v.string(),
    defaultAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    if (existing) {
      return await ctx.db.patch(existing._id, args);
    }
    return await ctx.db.insert("settings", { ...args, userId });
  },
});
