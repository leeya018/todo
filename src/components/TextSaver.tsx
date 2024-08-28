import Link from "next/link";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const TextSaver: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [texts, setTexts] = useState<string[]>([]);
  const [removeMode, setRemoveMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTexts = localStorage.getItem("savedTexts");
    if (savedTexts) {
      setTexts(JSON.parse(savedTexts));
    }
  }, []);

  const handleAddText = () => {
    if (text.trim() !== "") {
      const updatedTexts = [...texts, text];
      setTexts(updatedTexts);
      localStorage.setItem("savedTexts", JSON.stringify(updatedTexts));
      setText(""); // Clear the text area after adding
    }
  };

  const handleRemoveText = (index: number) => {
    const updatedTexts = texts.filter((_, i) => i !== index);
    setTexts(updatedTexts);
    localStorage.setItem("savedTexts", JSON.stringify(updatedTexts));
  };

  return (
    <div className="p-4">
      <div className="flex  justify-end">
        <button
          onClick={() => setRemoveMode(!removeMode)}
          className="mb-4 py-1 px-2 text-sm bg-red-500 text-white rounded-md"
        >
          {removeMode ? "Exit Remove Mode" : "Enable Remove Mode"}
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        rows={4}
        placeholder="Type your text here..."
      />
      <button
        onClick={handleAddText}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Add Text
      </button>
      <ul className="mt-4 list-disc pl-5">
        {texts.map((item, index) => (
          <li key={index} className="text-lg flex items-center">
            <span className="flex-grow">{item}</span>
            <button
              onClick={() => handleRemoveText(index)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              {removeMode && <FaTrash />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextSaver;
