import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    await getAuthUserId(ctx);
    return await ctx.db.query("services").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    description: v.string(),
    estimatedTime: v.number(),
  },
  handler: async (ctx, args) => {
    await getAuthUserId(ctx);
    return await ctx.db.insert("services", args);
  },
});
