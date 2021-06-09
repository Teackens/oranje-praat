import fs from 'fs';
import { Feed } from 'feed';
import { getSortedPosts } from 'utils/posts';

export const generateRssFeed = async () => {
    const episodes = getSortedPosts();
    const siteURL = 'https://oranjepraat.com';
    const date = new Date();

    const feed = new Feed({
        title: 'Oranje Praat Podcast',
        description:
            'Guus en Daniel volgen het nederlands elftal tijdens het EK 2021',
        id: siteURL,
        link: siteURL,
        copyright: `All rights reserved ${date.getFullYear()}, Oranje Praat`,
        updated: date,
        generator: 'Feed voor Oranje Praat Podcast',
        feedLinks: {
            rss2: `${siteURL}/rss/feed.xml`,
        },
        language: 'nl',
    });

    episodes.forEach(episode => {
        const url = `${siteURL}/${episode.slug}`;

        feed.addItem({
            title: episode.title,
            id: episode.title,
            link: url,
            content: episode.content,
            date: episode.date,
            audio: episode.frontmatter.uri,
            category: ['Sports', 'Soccer', 'Voetbal'],
        });
    });

    fs.mkdirSync('./public/rss', { recursive: true });
    fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
};
