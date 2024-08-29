import React, { useState, useEffect } from "react";
import ReasonList from "./ReasonList";

type ReasonsViewProps = {
  setShowWhy: (show: boolean) => void;
};

export type Reason = {
  id: number;
  text: string;
};

export default function ReasonsView({ setShowWhy }: ReasonsViewProps) {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Load reasons from localStorage on initial render
  useEffect(() => {
    const storedReasons = localStorage.getItem("reasons");
    if (storedReasons) {
      setReasons(JSON.parse(storedReasons));
    }
  }, []);

  // Save reasons to localStorage whenever the reasons array changes
  useEffect(() => {
    if (reasons.length > 0) {
      localStorage.setItem("reasons", JSON.stringify(reasons));
    }
  }, [reasons]);

  const addReason = () => {
    if (inputValue.trim() === "") return;

    const newReason: Reason = {
      id: Date.now(),
      text: inputValue,
    };

    setReasons((prevReasons) => [...prevReasons, newReason]);
    setInputValue("");
  };

  const deleteReason = (id: number) => {
    setReasons((prevReasons) =>
      prevReasons.filter((reason) => reason.id !== id)
    );
  };

  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50">
      <div className="relative h-full m-10 p-10 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => setShowWhy(false)}
          className="absolute top-3 right-3 text-xl font-semibold"
        >
          X
        </button>
        <ReasonList
          reasons={reasons}
          inputValue={inputValue}
          setInputValue={setInputValue}
          addReason={addReason}
          deleteReason={deleteReason}
        />
      </div>
    </div>
  );
}
