import Title from "@/components/title.mjs";

export default function NotFoundPage() {
    return (
        <div id="error">
            <Title>Not Found!</Title>
            <p>The requested resource could not be found!</p>
        </div>
    );
}