import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from 'react';
export const defaultLabels = {
    en: {
        backToHub: 'Browse all Games',
        imprint: 'Legal Notice',
        privacy: 'Privacy',
        terms: 'Terms',
        credits: 'Credits',
        sitemap: 'Sitemap',
    },
    de: {
        backToHub: 'Alle Spiele',
        imprint: 'Impressum',
        privacy: 'Datenschutz',
        terms: 'AGB',
        credits: 'Credits',
        sitemap: 'Sitemap',
    },
};
export function defaultLinks(labels) {
    return [
        { href: '/imprint/', label: labels.imprint },
        { href: '/privacy/', label: labels.privacy },
        { href: '/terms/', label: labels.terms },
        { href: '/credits/', label: labels.credits },
        { href: '/sitemap/', label: labels.sitemap },
    ];
}
function cx(...names) {
    return names.filter(Boolean).join(' ');
}
function ChevronLeft() {
    return (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "m15 18-6-6 6-6" }) }));
}
export function Footer({ lang = 'en', labels: labelOverrides, links, backLink, copyright, separator = '|', renderLink, children, className, classNames = {}, style, }) {
    const labels = { ...defaultLabels[lang], ...labelOverrides };
    const items = links ?? defaultLinks(labels);
    const sep = (extra) => (_jsx("span", { className: cx('saf-separator', extra, classNames.separator), "aria-hidden": "true", children: separator }));
    const start = [];
    if (backLink !== false) {
        start.push(_jsxs("a", { href: backLink?.href ?? '/', className: cx('saf-link', 'saf-back', classNames.backLink), children: [backLink?.icon === undefined ? _jsx(ChevronLeft, {}) : backLink.icon, backLink?.label ?? labels.backToHub] }, "back"));
    }
    if (copyright !== false) {
        start.push(_jsx("span", { className: cx('saf-copyright', classNames.copyright), children: copyright ?? _jsxs(_Fragment, { children: ["\u00A9 ", new Date().getFullYear(), " StreamArcade"] }) }, "copyright"));
    }
    if (children != null)
        start.push(_jsx(Fragment, { children: children }, "children"));
    const linkClass = cx('saf-link', classNames.link);
    return (_jsxs("footer", { className: cx('saf-footer', className, classNames.root), style: style, children: [_jsx("div", { className: cx('saf-start', classNames.start), children: start.map((node, i) => (_jsxs(Fragment, { children: [i > 0 && sep(), node] }, i))) }), items.length > 0 && (_jsx("nav", { className: cx('saf-nav', classNames.nav), children: items.map((link, i) => (_jsxs("span", { className: "saf-item", children: [i > 0 && sep('saf-separator--nav'), renderLink ? (renderLink(link, linkClass)) : (_jsx("a", { href: link.href, className: linkClass, ...(link.external && { target: '_blank', rel: 'noopener noreferrer' }), children: link.label }))] }, link.href))) }))] }));
}
