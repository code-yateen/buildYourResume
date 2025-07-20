import React from "react";
import { ResumeData } from "@/features/resume/types";

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-6 bg-gray-50 text-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Professional Resume</h2>
      {/* Render experience, education, skills, projects here */}
      <pre className="text-xs bg-gray-200 p-2 rounded overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
} 