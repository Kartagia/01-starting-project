"use client";
import NewsLinkComponent from "@/components/NewsLinkComponent.mjs";
import Title from "@/components/title.mjs";
import { getPost } from "@/lib/dummyNews.mjs";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";

/**
 * The page showing full screen image.
 */
export default async function ImagePage({ params }) {
    const router = new useRouter();

    const newsItemId = params.id;
    try {
        const newsItem = await getPost(newsItemId);
        return (<>
            <div className={"modal-backdrop"} onClick={router.back} />
            <dialog className={"modal"} open>
                <div className={"fullscreen-image"}>
                    <img width="100%" src={`/images/news/${newsItem.image}`} alt={`${newsItem.title}`} />
                </div>
            </dialog>
        </>)
    } catch (err) {
        console.log(err);
        notFound();
    }
}