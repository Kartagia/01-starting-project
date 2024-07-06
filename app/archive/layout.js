import Title from "@/components/title.mjs";

/**
 * The layout containing both latest news page and latest pages.
 * @returns {React.Component}
 */
export default function ArchiveLayout({ archive, latest, children }) {
  return (
    <section>
      <header>
        <Title>News Archive</Title>
      </header>
      <main>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
      {children}
      </main>
    </section>
  );
}
