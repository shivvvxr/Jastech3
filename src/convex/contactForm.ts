"use node";

import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const submitContactForm = action({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.sendEmails.sendContactEmail, {
      name: args.name,
      email: args.email,
      message: args.message,
    });
    
    return { success: true };
  },
});