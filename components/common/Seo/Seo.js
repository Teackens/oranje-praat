import Head from 'next/head';

import { getSiteMetaData } from '@utils/helpers';
import { useRouter } from 'next/router';

export function SEO({ title, description = '' }) {
    const siteMetadata = getSiteMetaData();

    const metaDescription = description || siteMetadata.description;

    const canonicalURL = siteMetadata.siteUrl + useRouter().asPath;

    return (
        <Head>
            <title>
                {title} | {siteMetadata.title}
            </title>
            <meta
                http-equiv="content-language"
                content={siteMetadata.language}
            ></meta>
            <meta name="description" content={siteMetadata.description} />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={title} />
            <link rel="alternate" hreflang="en" href={siteMetadata.siteUrl} />
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
            <link rel="canonical" href={canonicalURL} />
        </Head>
    );
}
