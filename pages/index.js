import Link from 'next/link';

import { Layout } from '@components/common';
import { getSortedPosts } from '@utils/posts';
import { generateRssFeed } from '../src/feed';

export default function Home({ posts }) {
    return (
        <Layout>
            {posts.map(
                ({ frontmatter: { title, description, date }, slug }) => (
                    <article key={slug}>
                        <h2 className="mb-2">
                            <Link href={'/post/[slug]'} as={`/post/${slug}`}>
                                <a className="text-4xl font-bold text-yellow-600 font-display">
                                    {title}
                                </a>
                            </Link>
                        </h2>
                        <span className="text-sm">{date}</span>

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
