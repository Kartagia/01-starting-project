"use client";

import Title from "@/components/title.mjs";

/**
 * The error page handling errors of the archive.
 */
export default function ArchiveErrorPage({error}) {

    return (<>
    <header className="error"><Title>An error has occured</Title></header>
    <main>
        <p className="error">{error.message}</p>
    </main>
    </>)
}