import Link from "next/link"
import useStore from "../store";

const links = [
    { href: '/', title: 'Index' },
    { href: '/test', title: 'Test' },
    { href: '/newtest', title: 'NewTest' },
    { href: '/epic', title: 'Epic' },
];

export default function Layout({ children }) {
    const { fetchValue } = useStore((state) => state);

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
            <h2>
                Observable value: <span>{fetchValue}</span>
            </h2>
        </>
    )
}
