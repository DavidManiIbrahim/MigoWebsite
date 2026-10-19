import { v } from "convex/values";
import { action, internalQuery, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import schema from "./schema.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Adds someone to the MIGO waitlist.
 *
 * Returns `{ ok: false, error }` for problems the visitor can fix (so the form
 * can show a friendly message) and only throws for unexpected failures.
 */
export const join = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.string(),
    role: v.union(v.literal("Rider"), v.literal("Driver")),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const phone = args.phone.trim();
    const city = args.city.trim();

    if (!name || !email || !phone || !city) {
      return { ok: false, error: "Please fill in every field." };
    }
    if (!EMAIL_PATTERN.test(email)) {
      return { ok: false, error: "Please enter a valid email address." };
    }

    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { name, phone, city, role });
      return { ok: true, duplicate: true };
    }

    await ctx.db.insert("waitlist", {
      name,
      email,
      phone,
      city,
      role: args.role,
      createdAt: Date.now(),
    });

    return { ok: true, duplicate: false };
  },
});


// Embedded admin credentials are checked only by Convex, never shipped to the browser.
const ADMIN_USERNAME = "migo-admin";
const ADMIN_PASSWORD = "R4!mQ8#vZ2@kP6xN9$wT3cL7";

export const adminLogin = action({
  args: { username: v.string(), password: v.string() },
  returns: v.union(
    v.object({ ok: v.literal(false), error: v.string() }),
    v.object({ ok: v.literal(true), entries: v.array(schema.doc("waitlist")) }),
  ),
  handler: async (ctx, args) => {
    if (args.username !== ADMIN_USERNAME || args.password !== ADMIN_PASSWORD) {
      return { ok: false, error: "Incorrect username or password." };
    }

    const entries = await ctx.runQuery(internal.waitlist.listForAdmin, {});
    return { ok: true, entries };
  },
});

export const listForAdmin = internalQuery({
  args: {},
  returns: v.array(schema.doc("waitlist")),
  handler: async (ctx) => {
    return await ctx.db.query("waitlist").order("desc").take(500);
  },
});
