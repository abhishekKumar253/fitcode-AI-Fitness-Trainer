import { v } from "convex/values";
import { mutation } from "./_generated/server";

const userArgs = {
  name: v.string(),
  email: v.string(),
  clerkId: v.string(),
  image: v.optional(v.string()),
};

export const syncUser = mutation({
  args: userArgs,
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) return;

    return await ctx.db.insert("users", args);
  },
});

export const updateUser = mutation({
  args: userArgs,
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!existingUser) return;

    return await ctx.db.patch(existingUser._id, {
      name: args.name,
      email: args.email,
      image: args.image,
    });
  },
});
