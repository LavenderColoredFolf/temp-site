const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

/** @type {import('next').NextConfig} */
module.exports = withMDX({
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	  },
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	images: {
		domains: ['cdn.discordapp.com', 'i.scdn.co', 'raw.githubusercontent.com'],
	},
});
