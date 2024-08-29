import React from "react";

type Reason = {
  id: number;
  text: string;
};

interface ReasonListProps {
  reasons: Reason[];
  inputValue: string;
  setInputValue: (value: string) => void;
  addReason: () => void;
  deleteReason: (id: number) => void;
}

const ReasonList: React.FC<ReasonListProps> = ({
  reasons,
  inputValue,
  setInputValue,
  addReason,
  deleteReason,
}) => {
  return (
    <div className=" flex flex-col    mt-8 p-4 ">
      <h1 className="text-xl font-bold mb-4">Reasons</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow p-2 border rounded-l-md"
          placeholder="Add a new reason"
          onKeyDown={(e) => e.code === "Enter" && addReason()}
        />
        <button
          onClick={addReason}
          className="p-2 bg-blue-500 text-white rounded-r-md"
        >
          Add
        </button>
      </div>
      <ul className="flex flex-col overflow-y-auto h-52">
        {reasons.map((reason) => (
          <li
            key={reason.id}
            className="flex justify-between items-center mb-2 p-2 border-b"
          >
            {reason.text}
            <button
              onClick={() => deleteReason(reason.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReasonList;
