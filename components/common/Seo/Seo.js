import Head from 'next/head';

import { getSiteMetaData } from '@utils/helpers';
import { useRouter } from 'next/router';

export function SEO({ title, description = '' }) {
    const siteMetadata = getSiteMetaData();

    const metaDescription = description || siteMetadata.description;

    const path = useRouter().asPath;
    const canonicalUrl = siteMetadata.siteUrl + path;

    return (
        <Head>
            <image href="/static/logo.png"></image>
            <title>
                {title} | {siteMetadata.title}, de podcast
            </title>

            <meta name="description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={title} />
            <meta property="og:url" content={siteMetadata.siteUrl} />
            <meta
                property="og:image"
                content={siteMetadata.siteUrl + 'mstile-150x150.png'}
            />
            <meta
                name="og:description"
                property="og:description"
                content={metaDescription}
            />
            <meta property="og:locale" content="nl_NL" />
            <link rel="canonical" href={encodeURIComponent(canonicalUrl)} />
            <meta name="keywords" content={siteMetadata.keywords} />
            <meta name="robots" content="index,follow"></meta>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />

            <link
                rel="alternate"
                hrefLang="nl"
                href={encodeURIComponent(siteMetadata.siteUrl)}
            />
        </Head>
    );
}
