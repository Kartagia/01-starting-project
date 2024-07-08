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
    return (<div className={"fullscreen-iamge"}>
        <NewsLinkComponent imageLink={"news"} newsId={newsItemId} newsItem={newsItem} />
    </div>)
    } catch(err) {
        notFound();
    }
}