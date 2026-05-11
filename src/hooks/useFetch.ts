// src/hooks/useFetch.ts

import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("네트워크 응답이 정상적이지 않습니다");
        }
        const result = await response.json();
        // null -> 데이터
        setData(result);
      } catch (err) {
        // null -> null
        setError(err instanceof Error ? err.message : "알 수 없는 오류 발생");
      } finally {
        // true -> false
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
