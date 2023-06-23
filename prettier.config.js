/** @type {import('prettier').RequiredOptions} */
const prettierConfig = {
  semi: false,
  trailingComma: 'none',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss']
}

module.exports = prettierConfig
