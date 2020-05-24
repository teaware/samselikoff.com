import React from "react"
import { Link, graphql } from "gatsby"
import { Spacer, Title, Container } from "../components/ui"
import { Helmet } from "react-helmet"

export default function BlogPage({ data }) {
  let articles = data.allMdx.edges.map(edge => ({
    title: edge.node.frontmatter.title,
    date: edge.node.frontmatter.date,
    url: `/blog/${edge.node.parent.relativePath
      .replace(/\/index.mdx?/, "")
      .toLowerCase()}`,
  }))

  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>

      <div className="pb-20">
        <Container size="some">
          <Spacer size="xl" />

          <Title>Blog</Title>

          <ul className="mt-12 leading-snug">
            {articles.map(article => (
              <li className="mt-6 md:mt-10" key={article.url}>
                <Link to={article.url} className="inline-block">
                  <h2 className="mt-1 text-lg font-semibold md:text-2xl">
                    {article.title}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  )
}

export const query = graphql`
  query BlogIndexQuery {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { listed: { ne: false } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
          parent {
            ... on File {
              relativePath
            }
          }
        }
      }
    }
  }
`
