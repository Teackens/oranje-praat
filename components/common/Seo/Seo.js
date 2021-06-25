import { getSiteMetaData } from '@utils/helpers';
import { useRouter } from 'next/router';

export function SEO({ title, description = '' }) {
    const siteMetadata = getSiteMetaData();

    const metaDescription = description || siteMetadata.description;

    const router = useRouter();
    let path;
    path = router ? router.asPath : '/';

    const canonicalUrl = siteMetadata.siteUrl + path;

    return (
        <>
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
            <link rel="canonical" href={canonicalUrl} />
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

            <link rel="alternate" hrefLang="nl" href={siteMetadata.siteUrl} />
            <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-199251003-1"
            ></script>

            <script
                async
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', 'UA-199251003-1');`,
                }}
            />
        </>
    );
}
