module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
       {
     name: '@storybook/addon-postcss',
     options: {
       postcssLoaderOptions: {
         implementation: require('postcss'),
         postcssOptions: {
           plugins: [{ "postcss-nested": { preserveEmpty: true } }]
        },
       },
     },
   },
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  }
}
