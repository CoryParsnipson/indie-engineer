import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkReadingTime from 'remark-reading-time';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeTitleFigure from 'rehype-title-figure';
import rehypeExternalLinks from 'rehype-external-links';

import remarkDataToFrontmatter from './src/lib/remark/remarkDataToFrontmatter.js';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

  layout: {
    blog: "./src/lib/layouts/Blog.svelte",
  },

  remarkPlugins: [
    remarkReadingTime,
    remarkDataToFrontmatter, // need this to put reading time info in front matter
  ],

  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, {
      behavior: "append",
    }],
    rehypeTitleFigure,
    [rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener"],
    }],
  ]
});

export default config;
