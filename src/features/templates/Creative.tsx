import React from "react";
import { ResumeData } from "@/features/resume/types";

export function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-6 bg-gradient-to-br from-pink-200 to-blue-200 text-black rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Creative Resume</h2>
      {/* Render experience, education, skills, projects here */}
      <pre className="text-xs bg-white/70 p-2 rounded overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
} 