import { type FC } from "react";
import toast, { Toaster } from "react-hot-toast";

import type { AssetType } from "../../../types/assets.ts";

import { FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "./AssetCard.css";
import { formatDateAndTime } from "../../../utils/format.ts";
import {
  useDeletePostMutation,
  useShareMutation,
} from "../../../queryClient/mutations/assets.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

type AssetCardProps = {
  asset: AssetType;
};

const AssetCard: FC<AssetCardProps> = ({ asset }) => {
  const deleteAssetMutation = useDeletePostMutation();
  const shareAssetMutation = useShareMutation();
  const queryClient = useQueryClient();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Share URL copied!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const onDelete = () => {
    deleteAssetMutation.mutate(
      {
        assetId: asset.id,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["assets"] });
        },
      },
    );
  };

  const onShare = (duration: number) => {
    shareAssetMutation.mutate(
      {
        assetId: asset.id,
        expiration: duration,
      },
      {
        onSuccess: async (data: any) => {
          await copyToClipboard(data.url);
        },
        onError: () => {
          toast.error("An error occurred!");
        },
      },
    );
  };

  return (
    <div className="asset-card">
      <div className="asset-card__img">
        <img src={asset.url} alt={asset.asset_tags[0]} />
      </div>
      <div className="asset-card__tags">
        {asset.asset_tags.map((tag) => (
          <div className="asset-card__tag">
            <span>{tag}</span>
          </div>
        ))}
      </div>
      <div className="asset-card__info">
        <p>{formatDateAndTime(asset.created_at)}</p>
        <div className="asset-card__icons">
          <Menu
            menuButton={
              <MenuButton className="menu-button">
                <FaShareAlt size={20} className="asset-card__icon" />
              </MenuButton>
            }
          >
            <MenuItem onClick={() => onShare(3600)}>Share for 1 hour</MenuItem>
            <MenuItem onClick={() => onShare(86400)}>
              Share for 24 hours
            </MenuItem>
            <MenuItem onClick={() => onShare(604800)}>
              Share for 1 week
            </MenuItem>
          </Menu>
          <MdDelete
            onClick={onDelete}
            color="#a92835"
            size={20}
            className="asset-card__icon"
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AssetCard;
