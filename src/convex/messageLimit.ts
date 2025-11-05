import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const MESSAGE_LIMIT = 10;
const RESET_PERIOD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const checkMessageLimit = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    const sessionId = userId || "anonymous";

    const userRecord = await ctx.db
      .query("userMessageCount")
      .withIndex("by_userId", (q) => q.eq("userId", sessionId))
      .first();

    if (!userRecord) {
      return { canSend: true, remaining: MESSAGE_LIMIT };
    }

    const now = Date.now();
    const timeSinceReset = now - userRecord.lastResetTime;

    // Reset if 24 hours have passed
    if (timeSinceReset >= RESET_PERIOD) {
      return { canSend: true, remaining: MESSAGE_LIMIT };
    }

    const remaining = MESSAGE_LIMIT - userRecord.messageCount;
    return {
      canSend: userRecord.messageCount < MESSAGE_LIMIT,
      remaining: Math.max(0, remaining),
    };
  },
});

export const incrementMessageCount = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    const sessionId = userId || "anonymous";

    const userRecord = await ctx.db
      .query("userMessageCount")
      .withIndex("by_userId", (q) => q.eq("userId", sessionId))
      .first();

    const now = Date.now();

    if (!userRecord) {
      await ctx.db.insert("userMessageCount", {
        userId: sessionId,
        messageCount: 1,
        lastResetTime: now,
      });
      return { success: true };
    }

    const timeSinceReset = now - userRecord.lastResetTime;

    // Reset if 24 hours have passed
    if (timeSinceReset >= RESET_PERIOD) {
      await ctx.db.patch(userRecord._id, {
        messageCount: 1,
        lastResetTime: now,
      });
    } else {
      await ctx.db.patch(userRecord._id, {
        messageCount: userRecord.messageCount + 1,
      });
    }

    return { success: true };
  },
});
