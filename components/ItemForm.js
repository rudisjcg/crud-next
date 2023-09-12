import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "./Layout";

export default function ItemForm({
  name: existingName,
  description: existingDescription,
  _id,
  images: existingImages,
}) {
  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const router = useRouter();

  async function saveItem(ev) {
    ev.preventDefault();
    const data = { name, description, images };

    if (_id) {
      //edit
      await axios.put("/api/items", { ...data, _id });
    } else {
      //create
      await axios.post("/api/items", data);
    }

    setGoBack(true);
  }

  if (goBack) {
    router.push("/");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
      console.log(res.data);
    }
  }

  return (
    <Layout>
      <form onSubmit={saveItem} className="flex flex-col gap-5">
        <label>Name</label>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          placeholder="Item Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Pictures</label>

        {!!images?.length &&
          images.map((link) => (
            <div key={link} className="h-24">
              <img className="h-24 rounded-lg" src={link} />
            </div>
          ))}
        <label
          className="w-24 h-24  text-center
        flex items-center justify-center cursor-pointer text-sm gap-1 text-gray-700 rounded-lg bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
        <button type="submit" className="border w-20 rounded-lg">
          Submit
        </button>
      </form>
    </Layout>
  );
}
