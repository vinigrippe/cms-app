import { put } from "@vercel/blob";

export default async function upload(request) {
  const fileBlob = new Blob([request.file], { type: request.type });

  const blob = await put(request.name, fileBlob, {
    access: "public",
    token:
      process.env.BLOB_READ_WRITE_TOKEN ||
      "vercel_blob_rw_NEWzAJLOHAk5sTd1_RHzEtELI3F6gY8ZLZrwa2fE081ADSQ",
  });

  return blob;
}
