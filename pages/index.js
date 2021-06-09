import Link from 'next/link';

import { Layout, SEO } from '@components/common';
import { getSortedPosts } from '@utils/posts';
import { generateRssFeed } from '../src/feed';

export default function Home({ posts }) {
    return (
        <Layout>
            <SEO title="Alle afleveringen" />
            {posts.map(
                ({ frontmatter: { title, description, date }, slug }) => (
                    <article key={slug}>
                        <header className="mb-2">
                            <h3 className="mb-2">
                                <Link
                                    href={'/post/[slug]'}
                                    as={`/post/${slug}`}
                                >
                                    <a className="text-4xl font-bold text-yellow-600 font-display">
                                        {title}
                                    </a>
                                </Link>
                            </h3>
                            <span className="text-sm">{date}</span>
                        </header>
                        <section>
                            <p className="mb-8 text-lg">{description}</p>
                        </section>
                        <hr></hr>
                        <br></br>
                    </article>
                )
            )}
        </Layout>
    );
}

export async function getStaticProps() {
    const posts = getSortedPosts();
    await generateRssFeed();

    return {
        props: {
            posts,
        },
    };
}
