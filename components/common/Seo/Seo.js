import Head from 'next/head';

import { getSiteMetaData } from '@utils/helpers';

export function SEO({ title, description = '' }) {
    const siteMetadata = getSiteMetaData();

    const metaDescription = description || siteMetadata.description;

    return (
        <Head>
            <image href="/static/logo.png"></image>
            <title>
                {title} | {siteMetadata.title}
            </title>
            <meta name="description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={title} />
            <meta
                name="og:description"
                property="og:description"
                content={metaDescription}
            />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
            <meta
                name="twitter:creator"
                content={siteMetadata.social.twitter}
            />
            <meta name="keywords" content={siteMetadata.keywords} />
            <meta name="robots" content="index,follow"></meta>
            <link
                href="/icons/favicon-16x16.png"
                rel="icon"
                type="image/png"
                sizes="16x16"
            />
            <link
                href="/icons/favicon-32x32.png"
                rel="icon"
                type="image/png"
                sizes="32x32"
            />
            <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        </Head>
    );
}
