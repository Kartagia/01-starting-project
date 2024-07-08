
/**
 * @typedef {Object} NewsItemProp
 * @property {import("@/lib/news.mjs").NewsArticle} newsItem The news item.
 * @property {string} newsId The identifier of the news entry.
 * @property {"article"|"fullscreen"} [imageLink="article"] The image link type. 
 * @property {boolean} [embedded=false] Is the link embeded. An embedded link
 * is returend as a fragment. An non-embeded link is returned as an article.
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
        embedded = false
    } = params;

    let imageLinkHref = `${detailRoot}/${newsId}`;
    if (fullscreenImageSuffix && (imageLink === "fullscreen")) {
        imageLinkHref += fullscreenImageSuffix;
    }

    const content = (<>
        <Link href={imageLinkHref}>
            <img
                src={`${imageRoot}/${newsItem.image}`}
                alt={newsItem.title}
            ></img>
        </Link>
        <Link href={`${detailRoot}/${newsId}`}>
            <Title>{newsItem.title}</Title>
        </Link>
    </>);

    if (embedded) {
        return content;
    } else {
        return (<article>{content}</article>)
    }
}