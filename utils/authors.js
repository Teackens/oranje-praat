import matter from 'gray-matter';
import fs from 'fs';

export function getAuthorsFolders() {
    // Get all posts folders located in `content/posts`
    const authorFolders = fs
        .readdirSync(`${process.cwd()}/content/authors`)
        .map(folderName => ({
            directory: folderName,
            filename: `${folderName}.md`,
        }));

    return authorFolders;
}

export function getAllAuthors() {
    const authorFolders = getAuthorsFolders();

    const authors = authorFolders.map(({ filename, directory }) => {
        // Get raw content from file
        const markdownWithMetadata = fs
            .readFileSync(`content/authors/${directory}/${filename}`)
            .toString();

        // Parse markdown, get frontmatter data, excerpt and content.
        const { data, excerpt, content } = matter(markdownWithMetadata);

        const frontmatter = {
            ...data,
        };

        // Remove .md file extension from post name
        const slug = filename.replace('.md', '');

        return {
            slug,
            frontmatter,
            excerpt,
            content,
        };
    });

    return authors;
}
