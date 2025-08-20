import { defineTable, defineSchema } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        tokenIdentifier: v.string(),
        imageUrl: v.string(),
        plan: v.union(v.literal("free"), v.literal("pro")),

        // Usage tracking for plan limits
        projectUsed: v.number(), // current project count
        exportsThisMonth: v.number(), // monthly export limit tracking

        // optional
        createdAt: v.number(),
        lastActiveAt: v.number(),

    }).index("by_token", ["tokenIdentifier"]),


})


