import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
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
				title="Green"
				keywords={[`AFL`, `Amsterdam Furniture Lab`, `cnc`, `maatwerk`, `zaagrobot`]}
			/>

			<article className="post-content page-template no-image">
				<div className="post-content-body">
					<h3 id="green">Milieu</h3>
					<p>
						Wij werken niet met ongecertificeerd hout. Ons plaatmateriaal en massief hout zijn Fsc
						of PEFC gecertificeerd. Fsc/PEFC hout komt uit de duurzame bosbouw: geen roofkap, de
						bomen worden hergeplant. We werken graag met 100% duurzame produkten zoals bijvoorbeeld
						EKOply of Medite Tricoya.
					</p>
					<div>
						<h3 id="hergebruik-service">AFL hergebruik service</h3>

						<p>
							Amsterdam Furniture Lab is een groot fan van hergebruik: van onze eigen meubels kunnen
							we altijd iets nieuws frezen omdat we meestal geen metalen verbinders gebruiken, maar
							ook met uw oude tafelblad bent u van harte welkom, als u bijvoorbeeld geen tafel meer
							nodig heeft, maar wel een bed.
						</p>
					</div>
				</div>
			</article>
		</Layout>
	);
};

const indexQuery = graphql`
	{
		site {
			siteMetadata {
				title
			}
		}
		introImage: file(relativePath: { eq: "v_sch3.jpg" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH)
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
