import NewsLinkComponent from "@/components/NewsLinkComponent.mjs";
import { getNewsArticle } from "@/lib/news.mjs";
import { notFound } from "next/navigation";

/**
 * The page showing full screen image.
 */
export default async function ImagePage({ params }) {

    const newsItemId = params.id;
    try {
        const newsItem = await getNewsArticle(newsItemId);
        return (
            <>
            <div className="modal-backdrop" /><dialog className="modal" open>
                <div className={"fullscreen-image"}>
                    <h2>Modal</h2>
                    <NewsLinkComponent imageLink={"article"} newsId={newsItemId} newsItem={newsItem} />
                </div>
            </dialog>
            </>
        )
    } catch (err) {
        notFound();
    }
}