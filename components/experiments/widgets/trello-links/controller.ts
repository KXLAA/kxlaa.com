import { useFieldArray, useForm } from "react-hook-form";
import useSwr from "swr";

export interface OGResult {
  ogTitle: string;
  ogType: string;
  ogUrl: string;
  ogDescription: string;
  ogImage: {
    url: string;
    width: string;
    height: string;
    type: string;
  };
  requestUrl: string;
  success: boolean;
}

export function useTrelloLinks() {
  const { register, control } = useForm<{
    tasks: {
      content: string;
    }[];
  }>();

  const { fields, append, remove, update, insert } = useFieldArray({
    control,
    name: "tasks",
  });
  return {};
}

export function useOgScrapper(url: string) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSwr<OGResult>(
    `/api/metadata/${url}`,
    fetcher
  );

  return {
    ogData: data,
    isLoading,
    isError: error,
  };
}
