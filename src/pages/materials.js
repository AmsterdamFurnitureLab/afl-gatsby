import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
// import { useIntl, Link, FormattedMessage } from "gatsby-plugin-intl"
import { FormattedMessage } from "gatsby-plugin-intl"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title;
  // const intl = useIntl()

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Materials"
        keywords={[
          `AFL`,
          `Amsterdam Furniture Lab`,
          `cnc`,
          `maatwerk`,
          `zaagrobot`,
        ]}
      />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h3 id="de-materialen">De Materialen</h3>
          <dl>
            <dt>Mdf</dt>
            <dt>Gekleurd mdf</dt>
            <figure className="kg-card kg-image-card">
              <Img
                fluid={data.stapeltje.childImageSharp.fluid}
                className="kg-image"
              />
              <figcaption>
                {/*<FormattedMessage id="concept.nieuwe_verbindingstechnieken" />*/}
              </figcaption>
            </figure>
            <figure className="kg-card kg-image-card">
              <Img
                fluid={data.innovus.childImageSharp.fluid}
                className="kg-image"
              />
              <figcaption>
                {/*<FormattedMessage id="concept.nieuwe_verbindingstechnieken" />*/}
              </figcaption>
            </figure>
            <figure className="kg-card kg-image-card">
              <Img
                fluid={data.kleurenwaaier.childImageSharp.fluid}
                className="kg-image"
              />
              <figcaption>
                {/*<FormattedMessage id="concept.nieuwe_verbindingstechnieken" />*/}
              </figcaption>
            </figure>

            <dt>Pine multiplex</dt>
            <dd>
              <p>
                Wel of niet voorgelakt, bestaat ook voorgelakt in diverse
                kleuren, bestaat ook met een fineer toplaag in vele houtsoorten
              </p>
            </dd>
            <figure className="kg-card kg-image-card">
              <Img
                fluid={data.pineMultiplex.childImageSharp.fluid}
                className="kg-image"
              />
              <figcaption>
                {/*<FormattedMessage id="concept.nieuwe_verbindingstechnieken" />*/}
              </figcaption>
            </figure>

            <dt>Okoumé multiplex</dt>
            <dd>
              <p>Wel of niet voorgelakt</p>
            </dd>
            <dt>Betonplex bruin of rood</dt>
            <figure className="kg-card kg-image-card">
              <Img
                fluid={data.betonplex.childImageSharp.fluid}
                className="kg-image"
              />
              <figcaption>
                {/*<FormattedMessage id="concept.nieuwe_verbindingstechnieken" />*/}
              </figcaption>
            </figure>
            <dt>Multiplex met hpl toplaag</dt>
            <dd>
              <p>
                Hpl is een relatief dikke (1.5 mm) harde kunststof toplaag.
                Wordt veel gebruikt voor tafelbladen, (keuken)werkbladen en
                deuren. Is in iedere kleur leverbaar. Hoogglans, of mat, met of
                zonder structuur, krasvast, alles bestaat.
              </p>
            </dd>
            <figure className="kg-card kg-image-card">
              <Img
                fluid={data.multiplex_hpl.childImageSharp.fluid}
                className="kg-image"
              />
              <figcaption>
                {/*<FormattedMessage id="concept.nieuwe_verbindingstechnieken" />*/}
              </figcaption>
            </figure>

            <dt>Multiplex met Forbo linoleum toplaag.</dt>
            <dd>
              <p>
                Schitterend materiaal voor o.a. tafels en werkbladen, in diverse
                kleuren
              </p>
            </dd>
            <dt>Massief hout</dt>
          </dl>
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    pineMultiplex: file(relativePath: { eq: "v_sch3.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    betonplex: file(
      relativePath: { eq: "materialen/betonplex_bruin&rood.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    stapeltje: file(
      relativePath: { eq: "materialen/gekleurd_mdf/stapeltje.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    innovus: file(relativePath: { eq: "materialen/gekleurd_mdf/innovus.png" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    kleurenwaaier: file(
      relativePath: { eq: "materialen/gekleurd_mdf/kleurenwaaier.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    multiplex_hpl: file(relativePath: { eq: "materialen/multiplex_hpl.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
