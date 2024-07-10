import Title from "@/components/title.mjs";
import LoadingComponent from "@/components/LoadingComponent";

/**
 * The updating text component is a component having an updating text.
 * @typedef {Object} UpdatingTextProps
 */

/**
 * 
 * @param {*} param0 
 */
export function UpdatingText({text="Loading", interval=1000, steps=3, filler="."}) {
    return (<LoadingComponent text={text} delay={interval/1000} steps={3} suffix={filler}/>)
}

export default function NewsLoadingPage() {

    return (<>
        <Title>News Page</Title>
        <span><UpdatingText /></span>
    </>)
}