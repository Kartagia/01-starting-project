
/**
 * @typedef {Object} NewsItemProp
 * @property {import("@/lib/news.mjs").NewsArticle} newsItem The news item.
 * @property {string} newsId The identifier of the news entry.
 * @property {"article"|"fullscreen"} [imageLink="article"] The image link type.
 */

import Link from "next/link";
import Title from "./title.mjs";

/**
 * The component representing a news link.
 * @param { NewsItemProp & import("./LinkListComponent.mjs").LinkListProps} params
 */
export default function NewsLinkComponent(params = {}) {
    const {
        newsId,
        newsItem,
        imageLink = "article",
        detailRoot = "/news",
        fullscreenImageSuffix = "/image",
        imageRoot = "/images/news",
    } = params;

    const imageHref = `${detailRoot}/${newsId}${
        ((imageLink === "fullscreen") && (fullscreenImageSuffix)) ? fullscreenImageSuffix :  ""}`;

    return (<article key={newsItem.id}>
        <Link href={imageHref}>
            <img
                src={`${imageRoot}/${newsItem.image}`}
                alt={newsItem.title}
            ></img>
        </Link>
        <Link href={`${detailRoot}/${newsId}`}>
            <Title>{newsItem.title}</Title>
        </Link>
    </article>
    )
}