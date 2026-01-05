import { useMutation } from "@tanstack/react-query";
import {
  createPostRequest,
  deletePostRequest,
  shareRequest,
} from "../../api/assets.ts";

export const useCreatePostMutation = () =>
  useMutation({
    mutationFn: ({ file }: { file: File | null }) => {
      return createPostRequest(file);
    },
  });

export const useShareMutation = () =>
  useMutation({
    mutationFn: ({
      assetId,
      expiration,
    }: {
      assetId: string;
      expiration?: number;
    }) => {
      return shareRequest(assetId, expiration);
    },
  });

export const useDeletePostMutation = () =>
  useMutation({
    mutationFn: ({ assetId }: { assetId: string }) => {
      return deletePostRequest(assetId);
    },
  });
