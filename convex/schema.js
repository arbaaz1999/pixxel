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

    prjects: defineTable({
        // Basic project info
        title: v.string(),
        userId: v.id("users"), // Owner reference

        // Canvas dimensions and state
        canvasState: v.any(), // Fabric.js canvas JSON (objects, layers, etc.)
        width: v.number(), // Canvas width in pixels
        height: v.number(), // Canvas height in pixels

        // Image pipeline - tracks image transformations
        originalImageUrl: v.optional(v.string()), // Initial uploaded image
        currentImageUrl: v.optional(v.string()), // Current processed image
        thumbnailUrl: v.optional(v.string()), // HW - Small preview for dashboard

        // ImageKit transformation state
        activeTransformations: v.optional(v.string()), // Current ImageKit URL params

        // AI features state - tracks what AI processing has been applied
        backgroundRemoved: v.optional(v.boolean()), // Has background been removed

        // Organization
        folderId: v.optional(v.id("folders")), // HW - Optional folder organization

        // Timestamps
        createdAt: v.number(),
        updatedAt: v.number(), // Last edit time
    }).index("by_user", ["userId"]) // Get user's project
        .index("by_user_updated", ["userId", "updatedAt"]) // Recent Projects
        .index("by_folder", ["folderId"]),

    folders: defineTable({
        name: v.string(), // Folder Name
        userId: v.id("users"), // owner
        createdAt: v.number(),
    }).index("by_user", ["userId"]) // user's folders
})

/* 
PLAN LIMITS EXAMPLE:
- Free: 3 projects, 20 exports/month, basic features only
- Pro: Unlimited projects/exports, all AI features
*/
