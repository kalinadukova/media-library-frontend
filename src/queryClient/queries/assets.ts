import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../api/assets.ts";
import type { GetAssetResponseType } from "../../types/assets.ts";

export const useGetAssetsQuery = (
  tags: string,
  date: string,
  type: string,
  page: number,
) =>
  useQuery<GetAssetResponseType>({
    queryKey: ["assets", tags, date, type, page],
    queryFn: () => getAllPosts(tags, date, type, page),
  });
