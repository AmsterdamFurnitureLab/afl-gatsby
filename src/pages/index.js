import React from "react";
import { graphql, StaticQuery } from "gatsby";
// import { GatsbyImage } from "gatsby-plugin-image"
import { IntlContextConsumer, FormattedMessage } from "gatsby-plugin-intl";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/postCard";

// import "../utils/global.scss"
import "../utils/normalize.css";
import "../utils/css/screen.css";

import "../utils/css/components/configurator.css";
// import ThreeContainer from '../components/ThreeContainer';

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
	const siteTitle = data.site.siteMetadata.title;
	const posts = data.allMarkdownRemark.edges;
	let postCounter = 0;

	return (
		<IntlContextConsumer>
			{({ language: currentLanguage }) => (
				<Layout title={siteTitle}>
					<SEO title="Home" keywords={[`shop`, `gatsby`, `javascript`, `react`]} />

					{/* <div className="configurator-canvas">
                      <ThreeContainer />
                    </div> */}

					<header className="page-head">
						<h2 className="page-head-title">
							<FormattedMessage id="home.description1" />
						</h2>
					</header>

					<div className="front-page"></div>

					<div className="post-feed">
						{posts.map(({ node }) => {
							if (node.fields.slug.endsWith(`/${currentLanguage}/`)) {
								postCounter++;
								return (
									<PostCard
										key={node.fields.slug}
										// count={postCounter+2}
										count={postCounter}
										node={node}
										postClass={`post`}
									/>
								);
							}
						})}
					</div>
				</Layout>
			)}
		</IntlContextConsumer>
	);
};

const indexQuery = graphql`
	{
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
						thumbnail {
							childImageSharp {
								gatsbyImageData(layout: FULL_WIDTH)
							}
						}
					}
				}
			}
		}
	}
`;

export default (props) => (
	<StaticQuery
		query={indexQuery}
		render={(data) => <BlogIndex location={props.location} props data={data} {...props} />}
	/>
);
