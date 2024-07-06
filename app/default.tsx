"use client";
import { createQueryPreloader, QueryReference, useReadQuery, useSuspenseQuery } from "@apollo/client";
import { ErrorBoundary } from "react-error-boundary";
import { GetBooksDocument, GetBooksQuery } from "../api/gql/graphql";
import { Suspense, useEffect, useState } from "react";
import { client } from "./apollo/ApolloClient";
import Link from "next/link";

const Book = () => {
  const { data } = useSuspenseQuery(GetBooksDocument);
  return <ul>
    {
      data?.books?.map((item) => (
        <li key={item.id}>{item.title} by {item.author.name}</li>
      ))
    }
  </ul>
};
const BookPlaceholder = () => {
  return <ul>
    <li>DEFAULT BOOK</li>
  </ul>

}
const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
export default function Home() {
  const mounted = useMounted();
  return <main style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    flexDirection: "column",
  }}>
    <h1>Page</h1>
    <ul>
      <li>
        <Link href={"/a"}>Page A</Link>
      </li>
    </ul>
    <ErrorBoundary fallback={<>Error</>}>
      <Suspense fallback={<BookPlaceholder/>}>
        <Book/>
      </Suspense>
    </ErrorBoundary>
  </main>
}
