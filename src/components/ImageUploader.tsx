import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [removeMode, setRemoveMode] = useState<boolean>(false);

  useEffect(() => {
    const savedImages = localStorage.getItem("uploadedImages");
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const readers = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return reader;
      });

      Promise.all(
        readers.map(
          (reader) =>
            new Promise<string>((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result as string);
              };
            })
        )
      ).then((base64Strings) => {
        const updatedImages = [...images, ...base64Strings];
        setImages(updatedImages);
        localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="mb-4"
        />
        <button
          onClick={() => setRemoveMode(!removeMode)}
          className="mb-4 py-1 px-2 text-sm bg-red-500 text-white rounded-md"
        >
          {removeMode ? "Exit Remove Mode" : "Enable Remove Mode"}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative">
            <img
              src={src}
              alt={`uploaded ${index}`}
              className="w-full h-auto object-cover rounded-lg"
            />
            {removeMode && (
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
              >
                <FaTrash size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
