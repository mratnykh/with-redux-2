import Link from "next/link"
import { useStore } from "../lib/zustandProvider";

const links = [
    { href: '/', title: 'Index' },
    { href: '/test', title: 'Test' },
    { href: '/newtest', title: 'NewTest' },
    { href: '/epic', title: 'Epic' },
];

export default function Layout({ children }) {
    return (
        <>
            {links.map(link => (
                <Link
                    href={link.href}
                    key={link.title}
                    style={{ marginRight: '16px' }}
                >{link.title}</Link>
            ))}
            <main>{children}</main>
        </>
    )
}
