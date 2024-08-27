import { useState, useEffect } from "react";

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

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

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="mb-4"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`uploaded ${index}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
