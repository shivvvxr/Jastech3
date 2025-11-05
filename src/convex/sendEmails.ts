import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const resend: Resend = new Resend(components.resend, {
  testMode: false
});

export const sendContactEmail = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await resend.sendEmail(ctx, {
      from: "noreply@jastechinfosys.com",
      to: "shivanshranjanshrivastava@gmail.com",
      subject: `New Contact Form Submission from ${args.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${args.name}</p>
        <p><strong>Email:</strong> ${args.email}</p>
        <p><strong>Message:</strong></p>
        <p>${args.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: [args.email],
    });
  },
});