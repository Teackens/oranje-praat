import Document, { Head, Main, NextScript, Html } from 'next/document';

import { getSiteMetaData } from '@utils/helpers';

export default class MyDocument extends Document {
    render() {
        const siteMetadata = getSiteMetaData();

        return (
            <Html lang={siteMetadata.language}>
                <Head>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=$G-798GF408L9"
                    ></script>
                    <script
                        async
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', ${YOUR_TRACKING_ID});`,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
