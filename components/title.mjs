"use client"

/**
 * The module containing title components.
 * @module component/title
 */

/**
 * The title component handling title.
 * @param {import("react").PropsWithChildren<TitleProps>} props 
 */
export default function Title(props) {
    return (
        <>
            <h1>{props.children}</h1>
        </>
    )
}