import Link from "next/link"

export default function Layout({ children }) {
    return (
        <>
            <Link href="/">Index</Link>
            <Link href="/test">Test</Link>
            <main>{children}</main>
        </>
    )
}
