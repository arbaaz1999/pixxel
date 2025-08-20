/**
 * Centers authentication page content with vertical padding.
 *
 * Renders its children inside a centered container using Tailwind classes `flex justify-center py-40`.
 *
 * @param {{children: React.ReactNode}} props - Component props.
 * @param {React.ReactNode} props.children - Content to render inside the layout.
 * @returns {JSX.Element} The centered layout wrapper.
 */
export default function AuthLayout({ children }) {
    return (
        <div className="flex justify-center py-40">
            {children}
        </div>
    )
}