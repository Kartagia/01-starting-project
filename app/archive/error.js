"use client";

import Title from "@/components/title.mjs";

/**
 * The error component displaying the error message.
 * @param {any} error The error. 
 * @returns {React.Component} The error message component.
 */
function ErrorMessage(error) {
    if (error instanceof Error) {
        return (<p className="error">{error.message}</p>);
    } else  {
        return (<p className="error">{error}</p>);
    }
}

/**
 * The default error page. 
 * @param {any} error The error. 
 */
export default function ErrorPage({error}) {
    return (<><header><Title>Error has occured</Title></header>
    <main>
    <ErrorMessage error={error}/>
    </main>
    </>);
}