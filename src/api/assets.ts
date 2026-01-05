import getApiInstance from "./apiInstance.ts";
import { isAxiosError } from "axios";
import { ASSETS_URL, SHARE_URL } from "./constants.ts";

export const createPostRequest = async (file: File | null) => {
  const api = getApiInstance();

  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  try {
    const result = await api.post(ASSETS_URL, formData);
    return result.data;
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
  }
};

export const getAllPosts = async (
  tags: string,
  date: string,
  type: string,
  page: number,
) => {
  const api = getApiInstance();

  try {
    const result = await api.get(ASSETS_URL, {
      params: {
        tags,
        created_at: date,
        mime_type: type,
        page,
        limit: 6,
      },
    });
    return result.data;
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
  }
};

export const shareRequest = async (assetId: string, expiration?: number) => {
  const api = getApiInstance();

  try {
    const result = await api.post(SHARE_URL, {
      asset_id: assetId,
      expiration_in_seconds: expiration,
    });
    return result.data;
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
  }
};

export const deletePostRequest = async (assetId: string) => {
  const api = getApiInstance();

  try {
    const result = await api.delete(ASSETS_URL + "/" + assetId);
    return result.data;
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
  }
};
