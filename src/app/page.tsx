"use client";

import TodoApp from "@/components/Todo";
import GoTo from "@/ui/GoTo";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen p-4">
      <GoTo text="To Vision" url="/vision" />

      <TodoApp />
    </div>
  );
};

export default Home;
