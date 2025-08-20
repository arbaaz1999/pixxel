"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from "@clerk/nextjs";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

/**
 * Wraps children with a Convex provider configured to use Clerk authentication.
 *
 * Renders a ConvexProviderWithClerk wired to the module-level Convex client and the Clerk `useAuth` hook,
 * making Convex queries/mutations available to descendant components with Clerk-based auth.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - React nodes to be rendered inside the provider.
 * @returns {JSX.Element} The provider wrapping the given children.
 */
export function ConvexClientProvider({ children }) {
    return (
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    );
}
