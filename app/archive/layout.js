import Title from "@/components/title.mjs";

/**
 * The layout containing both latest news page and latest pages.
 * @returns {React.Component}
 */
export default function ArchiveLayout({ latest, children }) {
  return (
    <section>
      <header>
        <Title>News Archive</Title>
      </header>
      <main>
        <secton id="archive-latest">{latest}</secton>
      </main>
    </section>
  );
}
