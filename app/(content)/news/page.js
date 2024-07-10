"use client";

import LinkListComponent from "@/components/LinkListComponent.mjs";
import Title from "@/components/title.mjs";
import { getAllPosts } from "@/lib/news.mjs";

import Link from "next/link";
import { useEffect, useState } from "react";


/**
 * The page showing all meals. 
 */
export default function NewsListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    /**
     * Load all news and update the state accordingly.
     */
    async function fetchNews() {
      setIsLoading(true);
      getAllPosts().then( (entries) => {
        setNews(entries);
        setIsLoading(false);
      }, (error) => {
        setError(error.message);
        setIsLoading(false);
      })
    }
    // Fetching the news.
    fetchNews();
  }, []);

  if (isLoading) {

  }

  if (error) {
    return (<p>{error.message}</p>)
  }

  return (
    <section>
      <header>
        <Title>News Page</Title>
      </header>
      <main>
        <LinkListComponent items={news}/>
      </main>
    </section>
  );
}
