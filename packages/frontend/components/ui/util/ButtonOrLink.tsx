import Link from 'next/link';
import { HTMLAttributes } from 'react';

export default function ButtonOrLink({
    href,
    ...props
}: HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> & { href?: string }) {
    const Tag = 'href' in props ? 'a' : 'button';

    const buttonOrLinkElement = <Tag {...props} />;

    if (href) {
        return <Link href={href}>{buttonOrLinkElement}</Link>;
    }

    return buttonOrLinkElement;
}
