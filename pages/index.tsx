import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-center text-2xl font-bold mt-20">Upload Photo</h1>
      <p className="mt-2 text-gray-500">Upload or select a profile photo</p>
      {image ? (
        <div className="w-24 h-24 mx-auto relative mt-20">
          <img className="w-24 h-24 rounded-full" src={image} alt="Profile" />
          {loading && (
            <svg
              className="absolute top-0 left-0 w-24 h-24"
              viewBox="0 0 100 100"
            >
              <circle
                className="text-gray-300"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="49"
                cx="50"
                cy="50"
              />
              <circle
                className="text-orange-600"
                strokeWidth="4"
                strokeDasharray="282.7"
                strokeDashoffset={`${
                  progress ? 282.7 - (282.7 * progress) / 100 : 282.7
                }`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="49"
                cx="50"
                cy="50"
              />
            </svg>
          )}
        </div>
      ) : (
        <div className="w-24 mx-auto h-24 bg-teal-200 text-gray-600 flex items-center justify-center text-2xl font-bold rounded-full mt-20">
          PD
        </div>
      )}
      <h4 className="mt-5 font-bold text-gray-600">Pratik Deshmukh</h4>
      <input
        onChange={handleFileSelect}
        id="profile"
        className="hidden"
        type="file"
        accept="image/*"
      />
      <button
        onClick={() => document.getElementById("profile")?.click()}
        className="bg-orange-600 w-64 rounded-full p-3 font-bold text-white mt-10"
      >
        Choose a photo
      </button><br/>
      {selectedFile && (
        <button
          onClick={handleUpload}
          className="bg-green-600 w-64 rounded-full p-3 font-bold text-white mt-5"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  );
}
