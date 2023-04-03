const path = require(`path`);
const siteConfig = require("./siteConfig");
const {createFilePath} = require(`gatsby-source-filesystem`);

const fs = require(`fs`);
const grayMatter = require(`gray-matter`);
const PATH_TO_MD_PAGES = path.resolve(`./content/blog`);
const defaultLanguage = siteConfig.defaultLanguage;
const PAGE_TEMPLATE = path.resolve(`./src/templates/blog-post.js`);

// const _getMarkdownNodeIdAndLanguage = node => {
//     const relativePath = path.relative(PATH_TO_MD_PAGES, node.absolutePath);
//     console.log('node.absolutePath: ', node.absolutePath);
//     console.log('relativePath: ', relativePath);
//     // e.g. static/code/my-project/en.md => { pageType: static, pageId: code/my-project, lang: en }
//     const tok = relativePath.split('/');
//     const pageType = 'blog';
//     const mdfile = tok[tok.length - 1];
//     const pageId = tok.slice(1, tok.length - 1).join('/');
//     const lang = path.basename(mdfile, '.md');
//     return {pageType, pageId, lang}
// };

const _isMarkdownNode = n => n.internal.mediaType === `text/markdown`;

const _loadMarkdownFile = n => grayMatter(fs.readFileSync(n.absolutePath, 'utf-8').toString());

// const _generatePagePath = ({ pageType, pageId, date }) => {
//   if ('blog' === pageType) {
//     const [ year, month, day ] = date.split('-');
//     return `/archives/${year}/${month}/${day}/${pageId}`
//   } else {
//     return `/${pageId}`
//   }
// };

const _generatePagePath = ({pageType, pageId, date}) => `/${pageId}`;

const _wrapGraphql = graphql => async str => {
    const result = await graphql(str);
    if (result.errors) {
        throw result.errors
    }
    return result
};

const _createMarkdownPages = ({pages, getNode, createPage}, cb) => {
    pages.forEach(({id, relativePath}, index) => {
        const node = getNode(id);
        const {fields: {page: {path: pagePath, lang}}} = node;

        if (defaultLanguage === lang) {
            createPage({
                path: pagePath,
                component: PAGE_TEMPLATE,
                context: {
                    relativePath,
                    ...(cb ? cb(index, node) : null)
                },
            })
        }
    })
};


exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;

    const blogPost = path.resolve(`./src/templates/blog-post.js`);
    return graphql(
        `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
    ).then(result => {
        if (result.errors) {
            throw result.errors
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach((post, index) => {
            const previous = index === posts.length - 1 ? null : posts[index + 1].node;
            const next = index === 0 ? null : posts[index - 1].node;

            let s = post.node.fields.slug;
            // s = s.substr(s.length - 4, s.length) + s.substr(1, s.length - 4);
            // s = "/" + s.substr(1, s.length - 4);
            // console.log('hierro: ', s);
            createPage({
                path: s,
                component: blogPost,
                context: {
                    slug: post.node.fields.slug,
                    previous,
                    next,
                },
            })
        });

        return null
    })
};

// TODO: COMPARE WITH BELOW!!!
exports.onCreateNode = ({node, actions, getNode}) => {
    // const {createNodeField} = actions;
    //
    // // pageType = "blog" or "static"
    // // pageId = page slug
    // // lang = "en" or "zh-TW"
    // // const { pageType, pageId, lang } = _getMarkdownNodeIdAndLanguage(node);
    //
    // // console.log('Dus hier: ', node);
    //
    // if (node.internal.type === `MarkdownRemark`) {
    //     const value = createFilePath({node, getNode});
    //     createNodeField({
    //         name: `slug`,
    //         node,
    //         value,
    //     })
    // }
    const { createNodeField } = actions;
    if (node.internal.type === "MarkdownRemark") {
        // console.log(' $$$$$$$ ##### hieroooooooooo: ', node);

        let { slug = "" } = node.frontmatter;

        if (slug === null || slug.trim() === "") {
            slug = createFilePath({ node, getNode, basePath: "pages" });
        }

        createNodeField({
            node,
            name: "slug",
            value: slug
        });
    }

};

/*
Create internal node representations of each Markdown file
 */
// TODO: COMPARE WITH ABOVE!!!
// exports.onCreateNode = ({ node, actions, getNodes }) => {
//   const { createNodeField } = actions;
//
//   if (_isMarkdownNode(node)) {
//     // pageType = "blog" or "static"
//     // pageId = page slug
//     // lang = "en" or "zh-TW"
//     const { pageType, pageId, lang } = _getMarkdownNodeIdAndLanguage(node);
//
//     // these values are extracted from within the markdown
//     const { data: { title, date, draft }, content: body } = _loadMarkdownFile(node);
//
//     const pageData = {
//       pageId,
//       type: pageType,
//       path: _generatePagePath({ pageType, pageId, date }),
//       lang,
//       date,
//       draft: !!draft,
//       versions: []
//     };
//
//     // if is default language node then load in versions in other languages
//     if (lang === defaultLanguage) {
//       // generate all versions of the node (including default language version)
//       getNodes().forEach(n => {
//         if (_isMarkdownNode(n)) {
//           const r = _getMarkdownNodeIdAndLanguage(n);
//
//           if (r.pageId === pageId) {
//             const gm = _loadMarkdownFile(n);
//
//             pageData.versions.push({
//               lang: r.lang,
//               summary: gm.data.summary,
//               title: gm.data.title,
//               date: gm.data.date,
//               markdown: gm.content,
//             })
//           }
//         }
//       })
//     }
//
//     // this adds all the data above to Gatsby's internal representation of the node
//     createNodeField({
//       node,
//       name: 'page',
//       value: pageData,
//     })
//   }
//
//   return node
// };


exports.onCreateWebpackConfig = ({
                                     stage,
                                     rules,
                                     loaders,
                                     plugins,
                                     actions,
                                 }) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.gltf$/,
                    use: [`url-loader`],
                },
            ],
        },
    })
};

// exports.onCreatePage = async ({ page, actions }) => {
//     const { createPage, deletePage } = actions;
//     // Check if the page is a localized 404
//     if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
//         console.log('HIEEEEEEEERRRRRR........');
//         const oldPage = { ...page };
//         // Get the language code from the path, and match all paths
//         // starting with this code (apart from other valid paths)
//         const langCode = page.path.split(`/`)[1];
//         page.matchPath = `/${langCode}/*`;
//         // Recreate the modified page
//         console.log(' .....: ', page);
//         deletePage(oldPage);
//         createPage(page)
//     }
// };
