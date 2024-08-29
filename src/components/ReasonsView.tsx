import React, { useState, useEffect } from "react";
import ReasonList from "./ReasonList";
import axios from "axios";

type ReasonsViewProps = {
  setShowWhy: any;
};

export type Reason = {
  id: number;
  text: string;
};

export default function ReasonsView({ setShowWhy }: ReasonsViewProps) {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Load reasons from localStorage on component mount
  useEffect(() => {
    const storedReasons = localStorage.getItem("reasons");
    if (storedReasons) {
      setReasons(JSON.parse(storedReasons));
    }
  }, []);

  // Save reasons to localStorage and send     them to the server
  const saveReasons = (updatedReasons: Reason[]) => {
    localStorage.setItem("reasons", JSON.stringify(updatedReasons));
  };

  const addReason = () => {
    if (inputValue.trim() === "") return;

    const newReason: Reason = {
      id: Date.now(),
      text: inputValue,
    };

    const updatedReasons = [...reasons, newReason];
    setReasons(updatedReasons);
    saveReasons(updatedReasons);
    setInputValue("");
  };

  const deleteReason = (id: number) => {
    const updatedReasons = reasons.filter((reason) => reason.id !== id);
    setReasons(updatedReasons);
    saveReasons(updatedReasons);
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
