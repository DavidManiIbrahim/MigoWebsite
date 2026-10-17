import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.string(),
    role: v.union(v.literal("Rider"), v.literal("Driver")),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
