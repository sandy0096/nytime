module.exports = {
    env: {
        URL: 'https://api.nytimes.com/svc/topstories/v2/',
        SEARCH: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        KEY: 'r8240WTHxEvbAXNGC3LGHWnmwAACG1Sg',
        PAGE: ['world', 'us', 'politics', 'nyregion', 'business', 'opinion', 'technology', 'science', 'health', 'sports', 'arts', 'books', 'style', 'food', 'travel', 'magazine'],
        NODE_ENV: 'production'
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.mdx/,
            use: [
                options.defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                },
            ],
        })
        return {
            ...config,
            node: {
                fs:
                    'empty'
            }
        }
    },
    images: {
        loader: 'imgix',
        domains: ['static01.nyt.com'],
    }
}