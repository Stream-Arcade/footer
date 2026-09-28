# @stream-arcade/footer

The StreamArcade footer as a React component. Without props it looks exactly like the footer
on the GeoGrid landing page; content and design can be overridden.

It needs no Tailwind: styling is plain CSS with CSS variables.

## Installation

```sh
pnpm add github:Stream-Arcade/footer#v1.0.0
```

`dist/` is committed, so installing needs no build step. Peer dependency: `react >= 18`.

## Usage

```tsx
import { Footer } from '@stream-arcade/footer';
import '@stream-arcade/footer/footer.css';

<Footer />;
```

With Tailwind v4, import the CSS **after** Tailwind in your stylesheet:

```css
@import 'tailwindcss';
@import '@stream-arcade/footer/footer.css';
```

## Overriding content

```tsx
<Footer
  lang="de" // default labels in German ('en' | 'de')
  labels={{ terms: 'Nutzungsbedingungen' }} // single labels
  links={[
    { href: '/imprint/', label: 'Impressum' },
    { href: 'https://github.com/Stream-Arcade', label: 'GitHub', external: true },
  ]}
  backLink={{ href: '/', label: 'Zurück' }} // `false` hides it, `icon: null` removes the arrow
  copyright="© 2026 Mein Projekt" // `false` hides it
  separator="·"
  renderLink={(link, className) => (
    <Link to={link.href} className={className}>
      {link.label}
    </Link>
  )}
>
  <span>Extra content in the left group</span>
</Footer>
```

`defaultLinks(labels)` and `defaultLabels` are exported, so you can extend the default list:

```tsx
import { Footer, defaultLabels, defaultLinks } from '@stream-arcade/footer';

<Footer links={[...defaultLinks(defaultLabels.en), { href: '/faq/', label: 'FAQ' }]} />;
```

## Overriding the design

**CSS variables**, either in your CSS or through `style`:

| Variable                | Default                    |
| ----------------------- | -------------------------- |
| `--saf-bg`              | `#1c1b2e`                  |
| `--saf-color`           | `rgb(255 255 255 / 0.6)`   |
| `--saf-color-hover`     | `#fff`                     |
| `--saf-separator-color` | `rgb(255 255 255 / 0.2)`   |
| `--saf-font-size`       | `0.875rem`                 |
| `--saf-line-height`     | `1.25rem`                  |
| `--saf-padding-x`       | `1.5rem` (mobile)          |
| `--saf-padding-x-md`    | `2rem` (from 48rem)        |
| `--saf-padding-y`       | `1.25rem`                  |
| `--saf-gap`             | `1rem`                     |
| `--saf-nav-gap`         | `0.75rem`                  |
| `--saf-transition`      | `color 150ms …`            |

```tsx
<Footer style={{ '--saf-bg': '#0b3d2e', '--saf-color-hover': '#f6c432' } as React.CSSProperties} />
```

**Classes**: `className` goes on the `<footer>`, and `classNames` targets individual parts
(`root`, `start`, `backLink`, `copyright`, `nav`, `link`, `separator`):

```tsx
<Footer className="bg-primary text-dark" classNames={{ link: 'hover:underline' }} />
```

The package's rules live in `@layer components`. That's why unlayered CSS and Tailwind
utilities override them without `!important`. Your own CSS can also target the classes
`.saf-footer`, `.saf-start`, `.saf-nav`, `.saf-item`, `.saf-link`, `.saf-back`,
`.saf-copyright` and `.saf-separator` directly.

## Development

```sh
pnpm install
pnpm build   # writes dist/ – commit it, it's what consumers install
```

Release: bump the version in `package.json`, run `pnpm build`, commit, then `git tag vX.Y.Z` and push the tag.
