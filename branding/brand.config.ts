// yunite.me brand on the runtime branding mechanism (replaces branding/constants/*.js).
//
// Authored in TypeScript against @ocelot-social/branding: `defineBranding` type-checks these
// overrides against the branding schema; a wrong key or type FAILS the build. Only values that
// differ from the framework defaults are set (sparse override).
//
// Content layout (one served assets folder, dynamically bound at runtime): assets/ = images, fonts
// and the brand stylesheet, html/ = static page HTML per locale. Paths are ROOT-relative; the
// multi-brand build namespaces them to /branding/yunite/… (collision-free).
//
// The whole theme applies at RUNTIME: colours + font families as `theme.cssVars`, the Overpass font
// via `theme.fontFaces`, and the bespoke component rules as assets/css/branding.css (listed in
// `assets.css`). Nothing here needs a webapp rebuild.
//
// NOT here: the auth cookie name. It used to be `metadata.cookieName: 'yunite-me-token'`, but a name
// baked into the webapp bundle at BUILD time (@nuxtjs/apollo) can never follow a runtime-injected
// brand — the cookie was written as 'ocelot-social-token' while the auth store looked for the branded
// name, so every login ended in the "no cookie" toast. The field is gone from the schema. yunite's
// name lives on as the DEPLOYMENT variable COOKIE_NAME (helmfile/values/ocelot.yaml.gotmpl →
// webapp.env), which keeps the sessions this brand established but cannot be switched mid-flight.
//
// NOT here either: e-mails (SUPPORT_EMAIL / *_LINK) are ENV → set in the deployment env.
import { defineBranding, type LinkPageKey } from '@ocelot-social/branding'

const HTML_FILE: Partial<Record<LinkPageKey, string>> = {
  organization: 'organization',
  donate: 'donate',
  imprint: 'imprint',
  termsAndConditions: 'terms-and-conditions',
  codeOfConduct: 'code-of-conduct',
  dataPrivacy: 'data-privacy',
  faq: 'faq',
  support: 'support',
}
const html = Object.fromEntries(
  Object.entries(HTML_FILE).map(([page, file]) => [
    page,
    { de: `html/de/${file}.html`, en: `html/en/${file}.html` },
  ]),
)

export default defineBranding({
  about: {
    description: 'yunite.me — networking portal for self-determined people, by the yunite association.',
    license: {
      logosReusable: false,
      colorsReusable: false,
      note: 'yunite name, logos and colours belong to the yunite association — ask before reuse.',
    },
  },
  metadata: {
    applicationName: 'yunite.me',
    applicationShortName: 'yunite.me',
    applicationDescription: 'yunite.me – Vernetzungsportal für selbstbestimmte und freie Menschen',
    organizationName: 'yunite – Verein für Vernetzung und Kooperation',
    organizationJurisdiction: 'Switzerland',
  },
  group: {
    descriptionMinLength: 10,
  },
  donation: {
    progressBarColorType: 'uni',
  },
  // Runtime theme (formerly the build-time _branding.scss). Colours use the packages/ui custom
  // property vocabulary (…-hover/-active/-contrast); the webapp picks up the same base vars once its
  // brandable SCSS tokens read var(--…). The Overpass font is loaded via @font-face from the served
  // assets folder.
  theme: {
    cssVars: {
      'color-primary': 'rgb(110, 139, 135)',
      'color-primary-hover': 'rgb(161, 179, 177)',
      'color-primary-active': 'rgb(81, 99, 97)',
      'color-primary-contrast': 'rgb(241, 248, 243)',
      'color-secondary': 'rgb(166, 255, 0)',
      'color-secondary-hover': 'rgb(188, 255, 130)',
      'color-secondary-active': 'rgb(140, 217, 0)',
      'color-secondary-contrast': 'rgb(241, 255, 225)',
      'font-family-heading': "'Overpass', Helvetica, Arial, sans-serif",
      'font-family-text': "'Overpass', Helvetica, Arial, sans-serif",
      // Former _branding.scss token reassignments (header/footer/donation/chat) — derive from the
      // brand base so they stay consistent. Footer/locale-menu are handled by branding.css rules.
      'color-header-background': 'var(--color-primary)',
      'color-donation-bar': 'var(--color-secondary)',
      'color-toast-green': 'var(--color-primary)',
      'chat-message-bg-me': 'rgb(161, 179, 177)',
      'chat-sidemenu-background-active': 'rgb(161, 179, 177)',
      'chat-new-message-color': 'rgb(188, 255, 130)',
      'chat-message-checkmark': 'rgb(250, 249, 250)',
      'chat-message-checkmark-seen': 'var(--color-secondary)',
      'chat-room-color-counter-badge': 'var(--color-primary)',
      'chat-room-background-counter-badge': 'var(--color-secondary)',
    },
    fontFaces: [
      {
        family: 'Overpass',
        src: 'assets/fonts/Overpass-VariableFont_wght.ttf',
        format: 'truetype',
      },
    ],
  },
  logos: {
    headerPath: 'assets/logo-horizontal.svg',
    headerMobilePath: 'assets/logo-horizontal.svg',
    headerWidth: '47px',
    signupPath: 'assets/logo-squared.svg',
    welcomePath: 'assets/logo-squared.svg',
    logoutPath: 'assets/logo-squared.svg',
    passwordResetPath: 'assets/logo-squared.svg',
  },
  // Custom header navigation (labels resolved from the brand locale overrides below).
  headerMenu: {
    menu: [
      { nameIdent: 'yuniteRebranding.header.newsFeed', path: '/' },
      { nameIdent: 'yuniteRebranding.header.groups', path: '/groups' },
      { nameIdent: 'yuniteRebranding.header.topics', url: 'https://yunite.org/themen/', target: '_self' },
      { nameIdent: 'yuniteRebranding.header.about', url: 'https://yunite.org', target: '_self' },
    ],
  },
  links: {
    // Every static page is an external link to yunite.org (same tab).
    pages: {
      organization: { externalLink: { url: 'https://yunite.org', target: '_self' } },
      donate: { externalLink: { url: 'https://yunite.org/spenden/', target: '_self' } },
      imprint: { externalLink: { url: 'https://yunite.org/impressum/', target: '_self' } },
      termsAndConditions: {
        externalLink: { url: 'https://yunite.org/nutzungsbedingungen/', target: '_self' },
      },
      codeOfConduct: {
        externalLink: { url: 'https://yunite.org/ueber-yunite/unsere-werte/', target: '_self' },
      },
      dataPrivacy: { externalLink: { url: 'https://yunite.org/datenschutz/', target: '_self' } },
      faq: { externalLink: { url: 'https://yunite.org/ueber-yunite/faq-hilfe/', target: '_self' } },
      support: { externalLink: { url: 'https://yunite.org/ueber-yunite/faq-hilfe/', target: '_self' } },
    },
    // yunite shows only these two in the footer.
    footerOrder: ['dataPrivacy', 'imprint'],
  },
  assets: {
    // Custom style overrides (formerly the raw CSS in _branding.scss), served + injected at runtime.
    css: ['assets/css/branding.css'],
    html,
    favicon: 'assets/favicon.ico',
  },
  // Brand string overrides, merged over the base i18n at runtime.
  locales: {
    de: {
      search: {
        hint: '@... sucht Nutzer, &... sucht Gruppen, !... sucht Beiträge, #… sucht Hashtags',
      },
      yuniteRebranding: {
        header: { about: 'Über Yunite', groups: 'Gruppen', newsFeed: 'Inhalte', topics: 'Themen' },
        footer: { dataPrivacy: 'Datenschutz', imprint: 'Impressum' },
      },
    },
    en: {
      search: {
        hint: '@... searches users, &... searches groups, !... searches posts, #… searches hashtags',
      },
      yuniteRebranding: {
        header: { about: 'About Yunite', groups: 'Groups', newsFeed: 'Content', topics: 'Topics' },
        footer: { dataPrivacy: 'Data privacy', imprint: 'Imprint' },
      },
    },
  },
})
