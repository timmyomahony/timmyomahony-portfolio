# Personal Portfolio

![Screenshot of my homepage](https://timmyomahony.com)

My personal portfolio website at [https://timmyomahony.com](https://timmyomahony.com).

## Background

I get a good bit of traffic from various "portfolio inspiration" blog posts around the web, along with occasional inquiries about how the site it put together. With that in mind I decided to open-source the codebase so that other people can use it too. So here it is.

It's a mix of a personal website, developer portfolio and photography blog. It's built with Next.js and is intended to be deployed as a statically generated site. That means there's no "server" and all the content is rendered at build-time. It's also full of pictures of me as well as information that's only relevant to me, so you'll have to do some ground-work to personalise it.

⚠️ **It's a work-in-progress and nothing is guaranteed (or supported)**. That said, read on if you're interested in using it and feel free to email me with any questions.

## Overview

The website is developed with Next.js and is intended to be statically generated (i.e. no backend). In order to do that, the content is mostly separated from the codebase.

There are a number of types of content in-use:

- **Static content**: like the [home page](https://timmyomahony.com/), [about page](https://timmyomahony.com/about/) and [advisory page](https://timmyomahony.com/advisory/). These are just hard-coded marketing-style pages using Next.js's app router and custom components.
- **Dynamic content**: like the [blog](https://timmyomahony.com/blog/), [projects section](https://timmyomahony.com/projects/), ["now" page](https://timmyomahony.com/now/) and other ["generic" pages](https://timmyomahony.com/privacy-policy/). When the website is built, these are fetched from a "./content" folder that I manage via a Git submodule. All content is written with MDX
- **Photos**: these are all hosted remotely in a S3 bucket. When the website is built, all photos are fetched the photo blog is generated. It's based on a previous project [`timmyomahony-photoblog`](https://github.com/timmyomahony/timmyomahony-photoblog) and requires adhereing to a certain opinionated folder structure.

## Getting Started

```bash
npm install
npm run dev
```

If you want some example content to get started, you can set up a Git submodule of my example content repo:

```sh
git clone --recurse-submodules git@github.com:timmyomahony/timmyomahony-portfolio-example-content.git
```

## MDX Content

MDX content for the website should be placed in the `/content` folder like so:

- `/content/posts`
- `/content/pages/`
- `/content/projects/`

This is set up as a Git submodule.

When first cloning the repo, you need to use:

```sh
git clone --recurse-submodules git@github.com:timmyomahony/timmyomahony-content.git content
```

If already cloned, use the following to set up the submodule:

```sh
git submodule update --init --recursive
```

When changes are made to anything in `/content` you need to push those changes separately:

```sh
cd content
git add .
git commit
git push origin main
```

## Optimised Images

You need to understand how Next's `<Image>` component works to optimise images, otherwise you will

In particular, it's worth understanding that when you use image optimisation with remote images (i.e. using a URL for your image `src` instead of statically importing an image in code with `import ... from ...`) then Next will generate a new version of your optimisation **on every request**. This will quickly eat into your usage metrics and potentially can cost you money.

Read for more:

https://nextjs.org/docs/pages/api-reference/components/image#caching-behavior

To handle this, we use a minimum cache time `minimumCacheTTL: 60 * 60 * 24 * 30`

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.md) file for details. If you use this project, please include appropriate attribution to the original author.
