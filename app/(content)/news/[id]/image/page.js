"use client";
import { getNewsArticle } from "@/lib/BackendNewsService.mjs";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The page showing full screen image.
 */
export default function ImagePage({ params }) {
    const [loading, setLoading] = useState(true);
    const [newsItem, setNewsItem] = useState();
    const [error, setError] = useState();
    useEffect(() => {
        setLoading(true);
        async function getNewsItem(id) {
            setNewsItem(await getNewsArticle(id));
            setLoading(false);
        }

        getNewsItem(params.id);
    }, []);

    if (error) {
        throw Error("Could not load the image");
    }

    const router = new useRouter();

    const content = (loading ? (<p>Loading...</p>) : (<>
        <div className={"modal-backdrop"} onClick={router.back} />
        <dialog className={"modal"} open>
            <div className={"fullscreen-image"}>
                <img width="100%" src={`/images/news/${newsItem.image}`} alt={`${newsItem.title}`} />
            </div>
        </dialog>
    </>));

    const newsItemId = params.id;
    try {
        return <>{content}</>;
    } catch (err) {
        console.log(err);
        notFound();
    }
}