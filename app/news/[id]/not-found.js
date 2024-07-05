import Title from "@/components/title.mjs";


/**
 * Create a not found page component.
 * @returns The error page.
 */
export default function NewsArticleNotFound() {
    return (<main className="not-found">
        <header><Title>News Article Not Found</Title></header>
        <main><p>Could not find the news article.</p></main>
    </main>);
}