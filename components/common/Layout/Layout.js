import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'next-themes';
import { faSpotify, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    faPodcast,
    faInfo,
    faEnvelope,
    faRss,
} from '@fortawesome/free-solid-svg-icons';
import { getSiteMetaData } from '@utils/helpers';

export function Layout({ children }) {
    return (
        <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white">
            <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
                <Header />
                <IndexDescription />
                <br></br>
                <hr></hr>
                <br></br>
                <main>{children}</main>
                <footer
                    className={
                        'grid grid-flow-col grid-cols-2 grid-rows-1 gap-4>'
                    }
                >
                    Oranje Praat, de podcast © {new Date().getFullYear()}
                    <ContactLinks />
                </footer>
            </div>
        </div>
    );
}

const IndexDescription = () => {
    const { pathname } = useRouter();
    const isRoot = pathname === '/';

    return (
        isRoot && (
            <div>
                <p>
                    Welkom op de site van Oranje Praat. De podcast over het
                    nederlands elftal🍊 tijdens het EK 2020⚽.
                </p>
                <br></br>
                <p>
                    Nuchtere klets praat over Oranje met voor/na beschouwingen
                    en het hele circus eromheen. Na iedere wedstrijd van het
                    nederlands eftal komt een nieuwe aflevering uit!
                </p>
            </div>
        )
    );
};

const Header = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const { pathname } = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const toggleDarkMode = checked => {
        const isDarkMode = checked;

        if (isDarkMode) setTheme('dark');
        else setTheme('light');
    };

    const isRoot = pathname === '/';
    const isDarkMode = resolvedTheme === 'dark';

    return (
        <header
            className={clsx('flex items-center justify-between ', {
                'mb-8': isRoot,
                'mb-2': !isRoot,
            })}
        >
            <div className={'max-w-md'}>
                {isRoot ? <LargeTitle /> : <SmallTitle />}
            </div>
            <SocialIconBar></SocialIconBar>
            {mounted && (
                <DarkModeSwitch
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    className={isRoot ? 28 : 24}
                />
            )}
        </header>
    );
};

const LargeTitle = () => (
    <h1>
        <Link href="/">
            <a
                className={clsx(
                    'text-3xl font-black leading-none text-black no-underline font-display',
                    'sm:text-5xl',
                    'dark:text-white'
                )}
            >
                Oranje Praat
            </a>
        </Link>
    </h1>
);

const SmallTitle = () => (
    <h1>
        <Link href="/">
            <a
                className={clsx(
                    'text-2xl font-black text-black no-underline font-display',
                    'dark:text-white'
                )}
            >
                Oranje Praat
            </a>
        </Link>
    </h1>
);

function ContactLinks() {
    const siteMetadata = getSiteMetaData();
    return (
        <div className={'flex justify-end space-x-10'}>
            <Link href={siteMetadata.contact.email}>
                <a className={''}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </Link>
            <Link href={'/over-ons'}>
                <a>
                    <FontAwesomeIcon icon={faInfo} />
                </a>
            </Link>
        </div>
    );
}

const SocialIconBar = () => {
    const siteMetadata = getSiteMetaData();
    return (
        <>
            <Link href={siteMetadata.rss}>
                <a>
                    <FontAwesomeIcon icon={faRss} />
                </a>
            </Link>
            <Link href={siteMetadata.social.instagram}>
                <a>
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
            </Link>
            <Link href={siteMetadata.social.spotify}>
                <a>
                    <FontAwesomeIcon icon={faSpotify} />
                </a>
            </Link>
            <Link href={siteMetadata.social.podcast}>
                <a>
                    <FontAwesomeIcon icon={faPodcast} />
                </a>
            </Link>
        </>
    );
};
