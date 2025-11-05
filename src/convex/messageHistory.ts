import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Save a message to history
export const saveMessage = mutation({
  args: {
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const sessionId = userId || "anonymous";

    await ctx.db.insert("messages", {
      userId: sessionId,
      role: args.role,
      content: args.content,
      timestamp: args.timestamp,
    });

    return { success: true };
  },
});

// Get message history for current user
export const getMessageHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const sessionId = userId || "anonymous";

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_userId_and_timestamp", (q) => q.eq("userId", sessionId))
      .order("asc")
      .take(args.limit || 100);

    return messages.map((msg) => ({
      id: msg._id,
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp,
    }));
  },
});

// Clear message history for current user
export const clearMessageHistory = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    const sessionId = userId || "anonymous";

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_userId", (q) => q.eq("userId", sessionId))
      .collect();

    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    return { success: true, deletedCount: messages.length };
  },
});
