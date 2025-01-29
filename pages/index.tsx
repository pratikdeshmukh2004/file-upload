import { useRef } from "react";

export default function Home() {
  const fileUpload = useRef(null);
  return (
    <div className="text-center">
      <h1 className="text-center text-2xl font-bold mt-20">Upload Photo</h1>
      <p className="mt-2 text-gray-500">Upload or selet a profile photo</p>
      {true ? (
        <div className="w-20 h-20 mx-auto bg-teal-200 text-gray-600 flex items-center justify-center text-2xl font-bold rounded-full mt-20">
          PD
        </div>
      ) : (
        <img
          className="w-20 h-20 mx-auto rounded-full mt-20"
          src="https://avatars.githubusercontent.com/u/44018192?v=4"
        />
      )}
      <h4 className="mt-5 font-bold text-gray-600">Pratik Deshmukh</h4>
      <input
        id="profile"
        className="hidden"
        type="file"
        accept="image/*"
        ref={fileUpload}
        capture
      />
      <button
        onClick={() => fileUpload.current.click()}
        className="bg-orange-600 w-64 rounded-full p-3 font-bold text-white mt-10"
      >
        Choose a photo
      </button>
    </div>
  );
}
