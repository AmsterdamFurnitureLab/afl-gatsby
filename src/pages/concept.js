import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
// import { useIntl, Link, FormattedMessage } from "gatsby-plugin-intl"
import { FormattedMessage } from "gatsby-plugin-intl"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  // const intl = useIntl()

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Concept"
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
          <div>
            <div>
              <h3><FormattedMessage id="home.titel"/> </h3>
              <ul>
                <li><FormattedMessage id="home.description1"/></li>
                <li><FormattedMessage id="home.description2"/></li>
                <li><FormattedMessage id="home.description3"/></li>
                <li><FormattedMessage id="home.description4"/></li>
              </ul>
            </div>
            <figure className="kg-card kg-image-card">
              <GatsbyImage
                fluid={data.introImage.childImageSharp.fluid}
                className="kg-image"
              />
              <figcaption>
                {/*<FormattedMessage id="concept.nieuwe_verbindingstechnieken" />*/}
              </figcaption>
            </figure>

            <div id="computergestuurde-frees">
              <FormattedMessage id="concept.computergestuurde_frees" />
            </div>
          </div>
          <div>
            <FormattedMessage id="concept.scharnieren_overbodig" />
          </div>

          <h3>
            <FormattedMessage id="concept.techniek_ontwerp.wie" />
          </h3>

          <div>
            <FormattedMessage id="concept.techniek_ontwerp.wij_maken" />

            <ul>
              <li>
                <FormattedMessage id="concept.techniek_ontwerp.eigen_ontwerp" />
              </li>
              <li>
                <FormattedMessage id="concept.techniek_ontwerp.ontwerpen_van_klanten" />
              </li>
              <li>
                <FormattedMessage id="concept.techniek_ontwerp.we_ontwerpen_voor_klanten" />
              </li>
              <li>Individuele objecten en series.</li>
            </ul>
          </div>
          <h3 id="zaagrobot">
            <FormattedMessage id="concept.zaagrobot.zaagrobot" />
          </h3>

          <p>
            <FormattedMessage id="concept.zaagrobot.duur_ingewikkeld" />
          </p>
          <p>
            <FormattedMessage id="concept.zaagrobot.beschikbaar_betaalbaarder" />
          </p>
          <h3 id="maatwerk">
            <FormattedMessage id="concept.maatwerk.maatwerk" />
          </h3>

          <div>
            <FormattedMessage id="concept.maatwerk.tweedeling" />
            <ul>
              <li>
                <FormattedMessage id="concept.maatwerk.maatwerk_bullet" />
              </li>
              <li>
                <FormattedMessage id="concept.maatwerk.serieproductie" />
              </li>
            </ul>
            <FormattedMessage id="concept.maatwerk.een_of_tien" />
          </div>
          <p>
            <FormattedMessage id="concept.maatwerk.tweedeling_bestaat_niet" />
          </p>
          <p>
            <FormattedMessage id="concept.maatwerk.conclusie" />
          </p>
          <h3 id="onze-machine">
            <FormattedMessage id="concept.onze_machine.onze_machine" />
          </h3>

          <p>
            <FormattedMessage id="concept.onze_machine.cad_cam" />
          </p>
          <p>
            <FormattedMessage id="concept.onze_machine.werkbereik" />
          </p>
          <h3 id="voor-geeks">
            <FormattedMessage id="concept.geeks.voor_de_geeks" />
          </h3>

          <div>
            <ul>
              <li>
                {" "}
                <FormattedMessage id="concept.geeks.fusion360" />
              </li>
              <li>
                <FormattedMessage id="concept.geeks.cam_pad" />
              </li>
              <li>
                <FormattedMessage id="concept.geeks.brackets" />
              </li>
              <li>
                <FormattedMessage id="concept.geeks.mach3" />
              </li>
              <li>
                <FormattedMessage id="concept.geeks.breakout_board" />
              </li>
            </ul>
          </div>
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
    introImage: file(relativePath: { eq: "cncCloseUp.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
