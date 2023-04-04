import React from "react";
import { graphql, StaticQuery } from "gatsby";
// import { GatsbyImage } from "gatsby-plugin-image"
// import { useIntl, Link, FormattedMessage } from "gatsby-plugin-intl"
import { FormattedMessage } from "gatsby-plugin-intl";

import Layout from "../components/layout";
import SEO from "../components/seo";

import "../utils/normalize.css";
import "../utils/css/screen.css";

const AboutPage = ({ data }, location) => {
	const siteTitle = data.site.siteMetadata.title;
	// const intl = useIntl()

	return (
		<Layout title={siteTitle}>
			<SEO
				title="Contact"
				keywords={[`AFL`, `Amsterdam Furniture Lab`, `cnc`, `maatwerk`, `zaagrobot`]}
			/>

			<article className="post-content page-template no-image">
				<div className="post-content-body">
					<h4 id="contact">Contact:</h4>
					<p>Amsterdam Furniture Lab</p>
					<p>Durgerdammerdijk 1010, 1026 CR Amsterdam</p>
					<p> 06 26010099</p>
					<p>info@amsterdamfurniturelab.nl</p>
					<p>Iban: NL68 TRIO 0198379722</p>
					<p>Btw nr.: NL1867.81.441.B.01</p>
					<p>KvK nr.: 34274010 </p>
				</div>
			</article>
		</Layout>
	);
};

const indexQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		introImage: file(relativePath: { eq: "v_sch3.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1360) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;

export default (props) => (
	<StaticQuery
		query={indexQuery}
		render={(data) => <AboutPage location={props.location} data={data} {...props} />}
	/>
);
