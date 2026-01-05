export type GetAssetResponseType = {
  result: AssetType[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AssetType = {
  id: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: Date;
  asset_tags: string[];
  url: string;
};
