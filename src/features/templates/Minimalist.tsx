import React from "react";
import { ResumeData } from "@/features/resume/types";

export function MinimalistTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects, positionsOfResponsibility, extraCurriculars } = data;
  return (
    <div className="p-6 bg-white text-black rounded-lg shadow">
      {/* Personal Info */}
      <div className="mb-4 flex flex-col gap-1 items-center text-center">
        {personalInfo.name && <div className="font-semibold text-lg">{personalInfo.name}</div>}
        {(personalInfo.phone || personalInfo.email || personalInfo.linkedin || personalInfo.github) && (
          <div className="text-sm flex items-center justify-center gap-2 flex-wrap">
            {[
              personalInfo.phone && <span key="phone">{personalInfo.phone}</span>,
              personalInfo.email && <span key="email">{personalInfo.email}</span>,
              personalInfo.linkedin && (
                <a key="linkedin" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline align-text-bottom lucide lucide-linkedin-icon lucide-linkedin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              ),
              personalInfo.github && (
                <a key="github" href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-800 inline align-text-bottom lucide lucide-github-icon " width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
              ),
            ]
              .filter(Boolean)
              .reduce((acc, curr, idx) => {
                if (idx > 0) acc.push(<span key={`sep-${idx}`}>|</span>);
                acc.push(curr);
                return acc;
              }, [] as React.ReactNode[])}
          </div>
        )}
      </div>
      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-4">
          <div className="font-semibold text-base mb-1">Experience</div>
          <ul className="space-y-1">
            {experience.map((exp) => (
              <li key={exp.id}>
                <div className="font-medium">{exp.company} - {exp.role}</div>
                <div className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</div>
                <div className="text-sm">{exp.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <div className="font-semibold text-base mb-1">Education</div>
          <ul className="space-y-1">
            {education.map((edu) => (
              <li key={edu.id}>
                <div className="font-medium">{edu.school} - {edu.degree}</div>
                <div className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</div>
                <div className="text-sm">{edu.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <div className="font-semibold text-base mb-1">Skills</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-xs">{skill}</span>
            ))}
          </div>
        </div>
      )}
      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <div className="font-semibold text-base mb-1">Projects</div>
          <ul className="space-y-1">
            {projects.map((proj) => (
              <li key={proj.id}>
                <div className="font-medium">{proj.name}</div>
                <div className="text-sm">{proj.description}</div>
                {proj.link && <a href={proj.link} className="text-blue-600 underline text-xs" target="_blank" rel="noopener noreferrer">{proj.link}</a>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Positions of Responsibility */}
      {positionsOfResponsibility.length > 0 && (
        <div className="mb-4">
          <div className="font-semibold text-base mb-1">Positions of Responsibility</div>
          <ul className="space-y-1">
            {positionsOfResponsibility.map((pos) => (
              <li key={pos.id}>
                <div className="font-medium">{pos.title} - {pos.organization}</div>
                <div className="text-xs text-gray-600">{pos.startDate} - {pos.endDate}</div>
                <div className="text-sm">{pos.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Extra-curriculars & Achievements */}
      {extraCurriculars.length > 0 && (
        <div className="mb-4">
          <div className="font-semibold text-base mb-1">Extra-curriculars & Achievements</div>
          <ul className="space-y-1">
            {extraCurriculars.map((extra) => (
              <li key={extra.id}>
                <div className="font-medium">{extra.title}</div>
                <div className="text-xs text-gray-600">{extra.date}</div>
                <div className="text-sm">{extra.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 