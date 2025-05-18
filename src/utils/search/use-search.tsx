import { useMemo, useState } from "react";

export type SearchMethod<T> = (query: string, original: T[]) => T[];

export type UseSearchOptions<T> = {
  searchMethod: SearchMethod<T>;
};

export const useSearch = <T,>(
  source: T[],
  { searchMethod }: UseSearchOptions<T>
) => {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => searchMethod(query, source),
    [query, source, searchMethod]
  );

  return {
    query,
    setQuery,
    results,
  };
};
