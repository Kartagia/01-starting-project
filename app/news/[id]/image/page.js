import { getPost } from "@/lib/dummyNews.mjs";
import { notFound } from "next/navigation";

/**
 * The page showing full screen image.
 */
export default async function IamgePage({params}) {

    const newsItemId = params.id;
    try {
    const newsItem = await getPost(newsItemId);
    return (<div className={"fullscreen-iamge"}>
        <img src={`/images/news/${newsItemId}`} alt={newsItem.title}/>
    </div>)
    } catch(err) {
        notFound();
    }
}