"use client";
import ComponentSwitcher from "@/components/ComponentSwitcher";
import ImageUploader from "@/components/ImageUploader";
import TextSaver from "@/components/TextSaver";
import GoTo from "@/ui/GoTo";
import Link from "next/link";
import React, { useState } from "react";

export default function VisionPage() {
  const [view, setView] = useState<"imageUploader" | "textSaver">(
    "imageUploader"
  );
  return (
    <div className="w-screen min-h-screen p-4">
      <GoTo text="To Todos" url="/" />

      <h1 className="font-semibold text-xl text-center">Vision Board</h1>
      <ComponentSwitcher view={view} setView={setView} />
      <div>
        {view === "imageUploader" && <ImageUploader />}
        {view === "textSaver" && <TextSaver />}
      </div>
    </div>
  );
}
