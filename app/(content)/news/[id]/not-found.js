import Title from "@/components/title.mjs";


/**
 * Create a not found page component.
 * @returns The error page.
 */
export default function NewsArticleNotFound() {
    return (<main className="not-found">
        <header><Title>News Article Not Found</Title></header>
        <main><p>Unfortunately we could not find the requested news article.</p></main>
    </main>);
}