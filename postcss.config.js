module.exports = {
  plugins: [
    require('postcss-import'),
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
    require('postcss-nesting'),
    require('postcss-flexbugs-fixes')
  ]
}
