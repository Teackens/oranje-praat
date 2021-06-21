import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { AudioPlayer } from '@components/AudioPlayer';
import { Layout, Image, SEO } from '@components/common';
import { getPostBySlug, getPostsSlugs } from '@utils/posts';

export default function Post({ post, frontmatter, nextPost, previousPost }) {
    return (
        <Layout>
            <SEO
                title={frontmatter.title}
                description={frontmatter.description || post.excerpt}
            />

            <article>
                <header className="mb-8">
                    <h1 className="mb-2 text-6xl font-black leading-none font-display">
                        {frontmatter.title}
                    </h1>
                    <p className="text-sm">{frontmatter.date}</p>
                </header>
                {post && (
                    <ReactMarkdown
                        className="mb-4 prose lg:prose-lg dark:prose-dark"
                        escapeHtml={false}
                        source={post.content}
                        renderers={{ code: CodeBlock, image: MarkdownImage }}
                    />
                )}
                <AudioPlayer uri={frontmatter.uri}></AudioPlayer>
                <hr className="mt-4" />
                <footer>
                    <ControlledAccordions
                        title="Transcript"
                        subTitle="test sub title"
                        content={frontmatter.transcript}
                    ></ControlledAccordions>
                </footer>
                <br />
            </article>

            <nav className="flex flex-wrap justify-between mb-10">
                {previousPost ? (
                    <Link
                        href={'/post/[slug]'}
                        as={`/post/${encodeURIComponent(previousPost.slug)}`}
                    >
                        <a className="text-lg font-bold">
                            ← {previousPost.frontmatter.title}
                        </a>
                    </Link>
                ) : (
                    <div />
                )}
                {nextPost ? (
                    <Link
                        href={'/post/[slug]'}
                        as={`/post/${encodeURIComponent(nextPost.slug)}`}
                    >
                        <a className="text-lg font-bold">
                            {nextPost.frontmatter.title} →
                        </a>
                    </Link>
                ) : (
                    <div />
                )}
            </nav>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getPostsSlugs();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const postData = getPostBySlug(slug);

    if (!postData.previousPost) {
        postData.previousPost = null;
    }

    if (!postData.nextPost) {
        postData.nextPost = null;
    }

    return { props: postData };
}

const CodeBlock = ({ language, value }) => {
    return (
        <SyntaxHighlighter style={style} language={language}>
            {value}
        </SyntaxHighlighter>
    );
};

const MarkdownImage = ({ alt, src }) => (
    <Image
        alt={alt}
        src={require(`../../content/assets/${src}`)}
        webpSrc={require(`../../content/assets/${src}?webp`)}
        previewSrc={require(`../../content/assets/${src}?lqip`)}
        className="w-full"
    />
);

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    })
);

export function ControlledAccordions({ title, content }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{content}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
