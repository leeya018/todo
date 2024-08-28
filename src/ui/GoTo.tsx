import Link from "next/link";
import React from "react";

type GoToProps = {
  text: string;
  url: string;
};
const GoTo = ({ text, url }: GoToProps) => {
  return (
    <div className="flex justify-end">
      <Link href={`${url}`}>
        <span className="underline text-blue-500">{text}</span>
      </Link>
    </div>
  );
};

export default GoTo;
