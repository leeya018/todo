import { useState } from "react";
import ImageUploader from "./ImageUploader"; // Ensure correct import path
import TextSaver from "./TextSaver"; // Ensure correct import path

type ComponentSwitcherProps = {
  setView: any;
  view: string;
};
const ComponentSwitcher = ({ setView, view }: ComponentSwitcherProps) => {
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => setView("imageUploader")}
          className={`py-2 px-4 rounded-md mr-2 ${
            view === "imageUploader" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show Image Uploader
        </button>
        <button
          onClick={() => setView("textSaver")}
          className={`py-2 px-4 rounded-md ${
            view === "textSaver" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show Text Saver
        </button>
      </div>
    </div>
  );
};

export default ComponentSwitcher;
