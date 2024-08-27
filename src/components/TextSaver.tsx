import { useState, useEffect } from "react";

const TextSaver: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [texts, setTexts] = useState<string[]>([]);

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

  return (
    <div className="p-4">
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
          <li key={index} className="text-lg">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextSaver;
