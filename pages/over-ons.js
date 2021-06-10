import Link from 'next/link';

import ReactMarkdown from 'react-markdown/with-html';

import { Layout, SEO } from '@components/common';
import { getAllAuthors } from '@utils/authors';

export default function About({ authors }) {
    return (
        <Layout>
            <SEO title="Over ons" />
            {authors.map(author => {
                return (
                    <article key={author.frontmatter.title}>
                        <header className="mb-2">
                            <h2 className="mb-2 text-3xl">
                                {author.frontmatter.title}
                            </h2>
                        </header>
                        <section>
                            {authors && (
                                <ReactMarkdown
                                    className="mb-4 prose lg:prose-lg dark:prose-dark"
                                    escapeHtml={false}
                                    source={author.content}
                                />
                            )}
                        </section>
                        <hr></hr>
                        <br></br>
                    </article>
                );
            })}
        </Layout>
    );
}

export async function getStaticProps() {
    const authors = getAllAuthors();

    return {
        props: {
            authors,
        },
    };
}
