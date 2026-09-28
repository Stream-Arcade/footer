import { Fragment, type CSSProperties, type ReactNode } from 'react';

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

export const defaultLabels: Record<FooterLang, FooterLabels> = {
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

export function defaultLinks(labels: FooterLabels): FooterLink[] {
  return [
    { href: '/imprint/', label: labels.imprint },
    { href: '/privacy/', label: labels.privacy },
    { href: '/terms/', label: labels.terms },
    { href: '/credits/', label: labels.credits },
    { href: '/sitemap/', label: labels.sitemap },
  ];
}

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

function cx(...names: (string | undefined | false)[]) {
  return names.filter(Boolean).join(' ');
}

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function Footer({
  lang = 'en',
  labels: labelOverrides,
  links,
  backLink,
  copyright,
  separator = '|',
  renderLink,
  children,
  className,
  classNames = {},
  style,
}: FooterProps) {
  const labels = { ...defaultLabels[lang], ...labelOverrides };
  const items = links ?? defaultLinks(labels);
  const sep = (extra?: string) => (
    <span className={cx('saf-separator', extra, classNames.separator)} aria-hidden="true">
      {separator}
    </span>
  );

  const start: ReactNode[] = [];
  if (backLink !== false) {
    start.push(
      <a
        key="back"
        href={backLink?.href ?? '/'}
        className={cx('saf-link', 'saf-back', classNames.backLink)}
      >
        {backLink?.icon === undefined ? <ChevronLeft /> : backLink.icon}
        {backLink?.label ?? labels.backToHub}
      </a>,
    );
  }
  if (copyright !== false) {
    start.push(
      <span key="copyright" className={cx('saf-copyright', classNames.copyright)}>
        {copyright ?? <>&copy; {new Date().getFullYear()} StreamArcade</>}
      </span>,
    );
  }
  if (children != null) start.push(<Fragment key="children">{children}</Fragment>);

  const linkClass = cx('saf-link', classNames.link);

  return (
    <footer className={cx('saf-footer', className, classNames.root)} style={style}>
      <div className={cx('saf-start', classNames.start)}>
        {start.map((node, i) => (
          <Fragment key={i}>
            {i > 0 && sep()}
            {node}
          </Fragment>
        ))}
      </div>
      {items.length > 0 && (
        <nav className={cx('saf-nav', classNames.nav)}>
          {items.map((link, i) => (
            <span key={link.href} className="saf-item">
              {i > 0 && sep('saf-separator--nav')}
              {renderLink ? (
                renderLink(link, linkClass)
              ) : (
                <a
                  href={link.href}
                  className={linkClass}
                  {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {link.label}
                </a>
              )}
            </span>
          ))}
        </nav>
      )}
    </footer>
  );
}
