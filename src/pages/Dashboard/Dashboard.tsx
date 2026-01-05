import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import Select, { type MultiValue } from "react-select";
import Pagination from "../../ui/components/Pagination/Pagination.tsx";
import Loader from "../../ui/common/Loader/Loader.tsx";

import Button from "../../ui/common/Button/Button.tsx";
import Modal from "../../ui/common/Modal/Modal.tsx";
import AssetCard from "../../ui/components/AssetCard/AssetCard.tsx";

import { useCreatePostMutation } from "../../queryClient/mutations/assets.ts";
import { useGetAssetsQuery } from "../../queryClient/queries/assets.ts";

import { MIME_TYPE_VALUES } from "../../utils/constants.ts";
import { formatDate } from "../../utils/format.ts";

import type { TagOption } from "../../types/validation.ts";

import { MdFileUpload } from "react-icons/md";

import "./Dashboard.css";

const Dashboard = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(1);

  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState<string>("");

  const [filters, setFilters] = useState({
    tags: "",
    date: "",
    type: "",
  });

  const {
    data: assets,
    isSuccess,
    isError,
    isLoading,
    refetch,
  } = useGetAssetsQuery(filters.tags, filters.date, filters.type, page);
  const uploadFileMutation = useCreatePostMutation();

  console.log(tags);
  console.log(date);
  console.log(type);

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed!");
      return;
    }

    setFile(file);

    // NOTE: Preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    uploadFileMutation.mutate(
      {
        file,
      },
      {
        onSuccess: async () => {
          onCloseModal();
          await queryClient.invalidateQueries({ queryKey: ["assets"] });
        },
      },
    );
  };

  const onCloseModal = () => {
    setIsOpen(false);
    setFile(null);
    setPreview("");
  };

  const onSearch = async () => {
    setFilters({
      tags: tags.join(","),
      date: formatDate(date),
      type,
    });
    await refetch();
  };

  return (
    <div className="dashboard-container">
      <Button title="Upload a picture" onClick={() => setIsOpen(true)} />
      <div className="dashboard-filters">
        <CreatableSelect
          isMulti={true}
          options={undefined}
          onChange={(options: MultiValue<TagOption>) => {
            setTags(options.map((o) => o.value));
          }}
          placeholder="Type tags"
        />
        <DatePicker
          selected={date}
          onChange={(date: Date | null) => setDate(date)}
          popperPlacement="bottom-start"
          popperClassName="datepicker-popper"
          portalId="datepicker-portal"
          placeholderText="Select date"
        />
        <Button
          title="Clear date"
          variant="outline"
          onClick={() => setDate(null)}
        />
        <Select
          className="basic-single"
          classNamePrefix="select"
          options={MIME_TYPE_VALUES}
          placeholder="Select image type"
          onChange={(option) => {
            if (!option) return;
            setType(option.value);
          }}
        />
        <Button title="Search" onClick={onSearch} />
      </div>
      {isLoading && <Loader />}
      {isSuccess && assets.result.length === 0 && (
        <p style={{ textAlign: "center" }}>No assets</p>
      )}
      {isSuccess && assets.result.length > 0 && (
        <div className="dashboard-content">
          <div className="gallery">
            {assets.result.map((a) => (
              <AssetCard asset={a} />
            ))}
          </div>
          <Pagination
            page={page}
            maxPages={assets.pagination.totalPages}
            setPage={setPage}
          />
        </div>
      )}
      {isError && (
        <p style={{ textAlign: "center", color: "#a92835" }}>
          An error occurred!
        </p>
      )}
      <Modal isOpen={isOpen} onClose={onCloseModal} title="Upload a picture">
        {preview && (
          <img className="preview" src={preview} alt="image preview" />
        )}
        <form className="upload-asset" onSubmit={onSubmit}>
          <>
            <input
              id="asset"
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div onClick={handleClick} className="upload-file-input">
              <MdFileUpload className="upload-file-input__icon" size={44} />
              <span className="upload-file-input__text">
                Click here to upload a picture
              </span>
            </div>
          </>
          <Button
            title="Upload picture"
            type="submit"
            disabled={Boolean(!file)}
            isLoading={uploadFileMutation.isPending}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
