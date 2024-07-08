import NewsLinkComponent from "@/components/NewsLinkComponent.mjs";
import { getPost } from "@/lib/dummyNews.mjs";
import { notFound } from "next/navigation";

/**
 * The page showing full screen image.
 */
export default async function ImagePage({params}) {

    const newsItemId = params.id;
    try {
    const newsItem = await getPost(newsItemId);
    return (<div className={"fullscreen-image"}>
        <NewsLinkComponent imageLink={"article"} newsId={newsItemId} newsItem={newsItem} />
    </div>)
    } catch(err) {
        notFound();
    }
}