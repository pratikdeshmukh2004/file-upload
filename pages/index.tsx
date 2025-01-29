import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(null);
    setLoading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<{ url: string }>(
        "/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );

      setImage(URL.createObjectURL(file));
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
        <img
          className="w-20 h-20 mx-auto rounded-full mt-20"
          src={image}
          alt="Profile"
        />
      ) : (
        <div className="w-20 h-20 mx-auto relative mt-20 flex items-center justify-center">
          {loading ? (
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="absolute w-24 h-24" viewBox="0 0 100 100">
                <circle
                  className="text-gray-300"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-orange-600"
                  strokeWidth="4"
                  strokeDasharray="251.2"
                  strokeDashoffset={`${
                    progress ? 251.2 - (251.2 * progress) / 100 : 251.2
                  }`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="w-20 h-20 bg-teal-200 text-gray-600 flex items-center justify-center text-2xl font-bold rounded-full">
                PD
              </div>
            </div>
          ) : (
            <div className="w-20 h-20 bg-teal-200 text-gray-600 flex items-center justify-center text-2xl font-bold rounded-full">
              PD
            </div>
          )}
        </div>
      )}
      <h4 className="mt-5 font-bold text-gray-600">Pratik Deshmukh</h4>
      <input
        onChange={handleUpload}
        id="profile"
        className="hidden"
        type="file"
        accept="image/*"
      />
      <button
        onClick={() => document.getElementById("profile")?.click()}
        className="bg-orange-600 w-64 rounded-full p-3 font-bold text-white mt-10"
        disabled={loading}
      >
        {loading ? "......" : "Choose a photo"}
      </button>
    </div>
  );
}
