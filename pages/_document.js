import Document, { Head, Main, NextScript, Html } from 'next/document';
import { SEO } from '../components/common/Seo';

import { getSiteMetaData } from '@utils/helpers';

export default class MyDocument extends Document {
    render() {
        const siteMetadata = getSiteMetaData();

        return (
            <Html lang={siteMetadata.language}>
                <Head>
                    <SEO title="Alle afleveringen" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
