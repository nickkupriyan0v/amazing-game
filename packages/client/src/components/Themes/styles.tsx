export const themeStyles = `:root {
  --chakra-colors-chakra-body-bg: #ffffff;
  --chakra-colors-chakra-body-text: #2d3748;
  --chakra-colors-chakra-border-color: #e2e8f0;
  --chakra-colors-chakra-placeholder-color: #a0aec0;
  --chakra-colors-chakra-subtle-bg: #f7fafc;
  --chakra-colors-chakra-subtle-text: #4a5568;
}

[data-theme='dark'] {
  --chakra-colors-chakra-body-bg: #0f1419;
  --chakra-colors-chakra-body-text: #e1e7ed;
  --chakra-colors-chakra-border-color: #2a3942;
  --chakra-colors-chakra-placeholder-color: #6b7b8a;
  --chakra-colors-chakra-subtle-bg: #1a232b;
  --chakra-colors-chakra-subtle-text: #a0b3c2;

  --chakra-colors-gray-50: #1a232b;
  --chakra-colors-gray-100: #22303a;
  --chakra-colors-gray-200: #2a3942;
  --chakra-colors-gray-300: #3d4d58;
  --chakra-colors-gray-400: #5c6b7a;
  --chakra-colors-gray-500: #7d8c9b;
  --chakra-colors-gray-600: #9eadbc;
  --chakra-colors-gray-700: #bec9d4;
  --chakra-colors-gray-800: #dfe5eb;
  --chakra-colors-gray-900: #ffffff;

  --chakra-colors-white: #0f1419;
  --chakra-colors-black: #e1e7ed;

  --chakra-colors-blue-50: #1a2b3a;
  --chakra-colors-blue-100: #1e3447;
  --chakra-colors-blue-200: #234155;
  --chakra-colors-blue-300: #2a5068;
  --chakra-colors-blue-400: #3182ce;
  --chakra-colors-blue-500: #4299e1;
  --chakra-colors-blue-600: #63b3ed;

  --chakra-colors-teal-50: #1a2b2a;
  --chakra-colors-teal-100: #1e3432;
  --chakra-colors-teal-200: #233d3a;
  --chakra-colors-teal-300: #2a4d48;
  --chakra-colors-teal-400: #319795;
  --chakra-colors-teal-500: #38b2ac;
  --chakra-colors-teal-600: #4fd1c5;
  --chakra-colors-teal-700: #81e6d9;

  --chakra-colors-orange-400: #dd6b20;
  --chakra-colors-orange-500: #ed8936;
}

body {
  background-color: var(--chakra-colors-chakra-body-bg) !important;
  color: var(--chakra-colors-chakra-body-text) !important;
  transition: all 0.3s ease;
}

[data-theme='dark'] {
  color-scheme: dark;
}

[data-theme='dark'] * {
  color: inherit !important;
}

[data-theme='dark'] .chakra-box,
[data-theme='dark'] [class*='chakra-'] {
  background-color: var(--chakra-colors-chakra-body-bg) !important;
  color: var(--chakra-colors-chakra-body-text) !important;
}

[data-theme='dark'] .chakra-box[style*='background'],
[data-theme='dark'] [style*='background-color'] {
  background-color: var(--chakra-colors-chakra-subtle-bg) !important;
}

[data-theme='dark'] header,
[data-theme='dark'] [class*='header'],
[data-theme='dark'] [class*='Header'] {
  background: var(--chakra-colors-chakra-subtle-bg) !important;
  color: var(--chakra-colors-chakra-body-text) !important;
  border-bottom: 1px solid var(--chakra-colors-chakra-border-color) !important;
}

[data-theme='dark'] [bg='teal.50'] {
  background: var(--chakra-colors-teal-50) !important;
}

[data-theme='dark'] [color='teal.600'] {
  color: var(--chakra-colors-teal-500) !important;
}

[data-theme='dark'] [color='teal.700'] {
  color: var(--chakra-colors-teal-400) !important;
}

[data-theme='dark'] [color='green'] {
  color: var(--chakra-colors-teal-400) !important;
}

[data-theme='dark'] [bg='teal.500'] {
  background: var(--chakra-colors-teal-500) !important;
}

[data-theme='dark'] [bg='orange.400'] {
  background: var(--chakra-colors-orange-400) !important;
}

[data-theme='dark'] [color='teal.600']:hover {
  color: var(--chakra-colors-teal-300) !important;
}

[data-theme='dark'] [color='teal.700']:hover {
  color: var(--chakra-colors-teal-300) !important;
}

[data-theme='dark'] [color='green']:hover {
  color: var(--chakra-colors-teal-300) !important;
}

[data-theme='dark'] [bg='teal.500']:hover {
  background: var(--chakra-colors-teal-600) !important;
}

[data-theme='dark'] [bg='orange.400']:hover {
  background: var(--chakra-colors-orange-500) !important;
}

[data-theme='dark'] .chakra-card,
[data-theme='dark'] [data-card],
[data-theme='dark'] .chakra-modal__content,
[data-theme='dark'] .chakra-menu__menu-list,
[data-theme='dark'] .chakra-alert {
  background: var(--chakra-colors-chakra-subtle-bg) !important;
  color: var(--chakra-colors-chakra-body-text) !important;
  border-color: var(--chakra-colors-chakra-border-color) !important;
}

[data-theme='dark'] .chakra-button:not([data-variant='ghost']) {
  background: var(--chakra-colors-gray-200) !important;
  color: var(--chakra-colors-gray-900) !important;
  border-color: var(--chakra-colors-chakra-border-color) !important;
}

[data-theme='dark'] .chakra-button[data-variant='ghost'] {
  color: var(--chakra-colors-chakra-body-text) !important;
}

[data-theme='dark'] .chakra-input,
[data-theme='dark'] .chakra-textarea,
[data-theme='dark'] .chakra-select {
  background: var(--chakra-colors-chakra-subtle-bg) !important;
  color: var(--chakra-colors-chakra-body-text) !important;
  border-color: var(--chakra-colors-chakra-border-color) !important;
}

[data-theme='dark'] .chakra-input::placeholder,
[data-theme='dark'] .chakra-textarea::placeholder {
  color: var(--chakra-colors-chakra-placeholder-color) !important;
}

[data-theme='dark'] .chakra-text,
[data-theme='dark'] .chakra-heading {
  color: var(--chakra-colors-chakra-body-text) !important;
}

[data-theme='dark'] .chakra-text[data-color='subtle'],
[data-theme='dark'] [color='gray.600'] {
  color: var(--chakra-colors-chakra-subtle-text) !important;
}

[data-theme='dark'] .chakra-tabs__tab {
  color: var(--chakra-colors-chakra-body-text) !important;
}

[data-theme='dark'] .chakra-tabs__tab[aria-selected='true'] {
  color: var(--chakra-colors-blue-400) !important;
  border-color: var(--chakra-colors-blue-400) !important;
}

[data-theme='dark'] .chakra-link {
  color: var(--chakra-colors-blue-400) !important;
}

[data-theme='dark'] .chakra-button:hover:not([data-variant='ghost']) {
  background: var(--chakra-colors-gray-300) !important;
}

[data-theme='dark'] .chakra-button[data-variant='ghost']:hover {
  background: var(--chakra-colors-gray-200) !important;
}

[data-theme='dark'] .chakra-stat__number,
[data-theme='dark'] .chakra-stat__label {
  color: var(--chakra-colors-chakra-body-text) !important;
}

[data-theme='dark'] [class*='hero'],
[data-theme='dark'] [class*='Hero'] {
  background: linear-gradient(
    135deg,
    var(--chakra-colors-chakra-body-bg) 0%,
    var(--chakra-colors-chakra-subtle-bg) 100%
  ) !important;
}

[data-theme='dark'] footer,
[data-theme='dark'] [class*='footer'],
[data-theme='dark'] [class*='Footer'] {
  background: var(--chakra-colors-chakra-subtle-bg) !important;
  color: var(--chakra-colors-chakra-body-text) !important;
}

[data-theme='dark'] {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[data-theme='dark'] * {
  text-rendering: optimizeLegibility;
}

.theme-dark .topic-card {
  background: var(--chakra-colors-chakra-subtle-bg) !important;
  border-color: var(--chakra-colors-chakra-border-color) !important;
  color: var(--chakra-colors-chakra-body-text) !important;
}

.theme-dark .topic-card:hover {
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1) !important;
}

.theme-dark .created,
.theme-dark .comments {
  color: var(--chakra-colors-chakra-subtle-text) !important;
}

.theme-dark .chakra-button.create-topic-btn:hover {
  background: var(--chakra-colors-teal-600) !important;
}

.theme-dark .chakra-avatar__fallback {
  background: var(--chakra-colors-teal-500) !important;
  color: white !important;
}

[data-theme='dark'] summary {
  color: var(--chakra-colors-teal-400) !important;
  cursor: pointer;
  font-weight: 500;
}

[data-theme='dark'] summary:hover {
  color: var(--chakra-colors-teal-300) !important;
}

[data-theme='dark'] p {
  color: var(--chakra-colors-chakra-body-text) !important;
  line-height: 1.5;
}

[data-theme='dark'] details[open] {
  background: var(--chakra-colors-chakra-body-bg) !important;
  border: 1px solid var(--chakra-colors-chakra-border-color) !important;
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
}
`
