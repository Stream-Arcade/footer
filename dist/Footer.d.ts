import { type CSSProperties, type ReactNode } from 'react';
export type FooterLang = 'en' | 'de';
export interface FooterLink {
    href: string;
    label: ReactNode;
    /** Opens in a new tab with rel="noopener noreferrer". */
    external?: boolean;
}
export interface FooterLabels {
    backToHub: string;
    imprint: string;
    privacy: string;
    terms: string;
    credits: string;
    sitemap: string;
}
export declare const defaultLabels: Record<FooterLang, FooterLabels>;
export declare function defaultLinks(labels: FooterLabels): FooterLink[];
export interface FooterBackLink {
    href?: string;
    label?: ReactNode;
    /** Replaces the chevron icon; `null` removes it. */
    icon?: ReactNode;
}
export interface FooterClassNames {
    root?: string;
    start?: string;
    backLink?: string;
    copyright?: string;
    nav?: string;
    link?: string;
    separator?: string;
}
export interface FooterProps {
    /** Language of the default labels. */
    lang?: FooterLang;
    /** Overrides single default labels, e.g. for another language. */
    labels?: Partial<FooterLabels>;
    /** Replaces the default link list. */
    links?: FooterLink[];
    /** Link back to the hub (contract: every page links to `/`). `false` hides it. */
    backLink?: FooterBackLink | false;
    /** Replaces the copyright text. `false` hides it. */
    copyright?: ReactNode | false;
    /** Replaces the `|` separator. */
    separator?: ReactNode;
    /** Renders a link yourself, e.g. with a router `<Link>`. */
    renderLink?: (link: FooterLink, className: string) => ReactNode;
    /** Extra content at the end of the left group. */
    children?: ReactNode;
    className?: string;
    classNames?: FooterClassNames;
    /** Also the place to set the `--saf-*` CSS variables. */
    style?: CSSProperties;
}
export declare function Footer({ lang, labels: labelOverrides, links, backLink, copyright, separator, renderLink, children, className, classNames, style, }: FooterProps): import("react").JSX.Element;
