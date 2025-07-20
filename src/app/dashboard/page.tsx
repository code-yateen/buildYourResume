"use client";
import { Button, Card, CardContent, CardHeader, Input } from "@/components/ui";
import { MinimalistTemplate } from "@/features/templates/Minimalist";
import { useResumeStore } from "@/features/resume/store";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useReactToPrint } from "react-to-print";

const tabs = [
  "Personal Info",
  "Experience",
  "Education",
  "Skills",
  "Projects",
  "Positions of Responsibility",
  "Extra-curriculars & Achievements",
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const { data, updateSection, updatePersonalInfo } = useResumeStore();
  const [skillInput, setSkillInput] = useState("");
  const [expInput, setExpInput] = useState({ company: "", role: "", startDate: "", endDate: "", description: "" });
  const [eduInput, setEduInput] = useState({ school: "", degree: "", startDate: "", endDate: "", description: "" });
  const [projInput, setProjInput] = useState({ name: "", description: "", link: "" });
  const [posInput, setPosInput] = useState({ title: "", organization: "", startDate: "", endDate: "", description: "" });
  const [extraInput, setExtraInput] = useState({ title: "", description: "", date: "" });
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef, // ✅ use contentRef instead of content
    documentTitle: "My Resume", // Optional, sets the PDF title
  });

  // Add handlers for new sections
  const addPosition = () => {
    if (posInput.title && posInput.organization) {
      updateSection("positionsOfResponsibility", [
        ...data.positionsOfResponsibility,
        { ...posInput, id: uuidv4() },
      ]);
      setPosInput({ title: "", organization: "", startDate: "", endDate: "", description: "" });
    }
  };
  const removePosition = (id: string) => {
    updateSection(
      "positionsOfResponsibility",
      data.positionsOfResponsibility.filter((p) => p.id !== id)
    );
  };

  const addExtra = () => {
    if (extraInput.title && extraInput.description) {
      updateSection("extraCurriculars", [
        ...data.extraCurriculars,
        { ...extraInput, id: uuidv4() },
      ]);
      setExtraInput({ title: "", description: "", date: "" });
    }
  };
  const removeExtra = (id: string) => {
    updateSection(
      "extraCurriculars",
      data.extraCurriculars.filter((e) => e.id !== id)
    );
  };

  // Existing handlers...
  const addSkill = () => {
    if (skillInput.trim()) {
      updateSection("skills", [...data.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };
  const removeSkill = (idx: number) => {
    updateSection("skills", data.skills.filter((_, i) => i !== idx));
  };

  const addExperience = () => {
    if (expInput.company && expInput.role) {
      updateSection("experience", [...data.experience, { ...expInput, id: uuidv4() }]);
      setExpInput({ company: "", role: "", startDate: "", endDate: "", description: "" });
    }
  };
  const removeExperience = (id: string) => {
    updateSection("experience", data.experience.filter((e) => e.id !== id));
  };

  const addEducation = () => {
    if (eduInput.school && eduInput.degree) {
      updateSection("education", [...data.education, { ...eduInput, id: uuidv4() }]);
      setEduInput({ school: "", degree: "", startDate: "", endDate: "", description: "" });
    }
  };
  const removeEducation = (id: string) => {
    updateSection("education", data.education.filter((e) => e.id !== id));
  };

  const addProject = () => {
    if (projInput.name && projInput.description) {
      updateSection("projects", [...data.projects, { ...projInput, id: uuidv4() }]);
      setProjInput({ name: "", description: "", link: "" });
    }
  };
  const removeProject = (id: string) => {
    updateSection("projects", data.projects.filter((p) => p.id !== id));
  };

  // Personal Info handler
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="flex flex-1 flex-col md:flex-row gap-6 p-4 md:p-8">
        {/* Left Panel: Editor */}
        <Card className="w-full md:w-1/2 max-w-md mx-auto md:mx-0">
          <CardHeader>
            <div className="flex gap-2 mb-4 flex-wrap">
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "outline"}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 min-w-[120px]"
                >
                  {tab}
                </Button>
              ))}
            </div>
            <span className="text-lg font-semibold">Edit {activeTab}</span>
          </CardHeader>
          <CardContent>
            {/* Personal Info Form */}
            {activeTab === "Personal Info" && (
              <div className="flex flex-col gap-2">
                <Input name="name" placeholder="Full Name" value={data.personalInfo.name} onChange={handlePersonalInfoChange} />
                <Input name="phone" placeholder="Phone (with country code)" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} />
                <Input name="email" placeholder="Gmail" value={data.personalInfo.email} onChange={handlePersonalInfoChange} />
                <Input name="linkedin" placeholder="LinkedIn (optional)" value={data.personalInfo.linkedin || ""} onChange={handlePersonalInfoChange} />
                <Input name="github" placeholder="GitHub (optional)" value={data.personalInfo.github || ""} onChange={handlePersonalInfoChange} />
              </div>
            )}
            {/* Experience Form */}
            {activeTab === "Experience" && (
              <div className="flex flex-col gap-2">
                <Input placeholder="Company" value={expInput.company} onChange={e => setExpInput(v => ({ ...v, company: e.target.value }))} />
                <Input placeholder="Role" value={expInput.role} onChange={e => setExpInput(v => ({ ...v, role: e.target.value }))} />
                <Input placeholder="Start Date" value={expInput.startDate} onChange={e => setExpInput(v => ({ ...v, startDate: e.target.value }))} />
                <Input placeholder="End Date" value={expInput.endDate} onChange={e => setExpInput(v => ({ ...v, endDate: e.target.value }))} />
                <Input placeholder="Description" value={expInput.description} onChange={e => setExpInput(v => ({ ...v, description: e.target.value }))} />
                <Button variant="outline" className="mt-2 bg-white text-black h-10 w-fit px-2 mx-auto" onClick={addExperience}>Add Experience</Button>
                <ul className="mt-2 space-y-1">
                  {data.experience.map((exp) => (
                    <li key={exp.id} className="flex justify-between items-center text-sm bg-muted px-2 py-1 rounded">
                      <span>{exp.company} - {exp.role}</span>
                      <Button variant="ghost" onClick={() => removeExperience(exp.id)}>Remove</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Education Form */}
            {activeTab === "Education" && (
              <div className="flex flex-col gap-2">
                <Input placeholder="School" value={eduInput.school} onChange={e => setEduInput(v => ({ ...v, school: e.target.value }))} />
                <Input placeholder="Degree" value={eduInput.degree} onChange={e => setEduInput(v => ({ ...v, degree: e.target.value }))} />
                <Input placeholder="Start Date" value={eduInput.startDate} onChange={e => setEduInput(v => ({ ...v, startDate: e.target.value }))} />
                <Input placeholder="End Date" value={eduInput.endDate} onChange={e => setEduInput(v => ({ ...v, endDate: e.target.value }))} />
                <Input placeholder="Description" value={eduInput.description} onChange={e => setEduInput(v => ({ ...v, description: e.target.value }))} />
                <Button className="mt-2 bg-white text-black h-10 w-fit px-2 mx-auto" onClick={addEducation}>Add Education</Button>
                <ul className="mt-2 space-y-1">
                  {data.education.map((edu) => (
                    <li key={edu.id} className="flex justify-between items-center text-sm bg-muted px-2 py-1 rounded">
                      <span>{edu.school} - {edu.degree}</span>
                      <Button variant="ghost" onClick={() => removeEducation(edu.id)}>Remove</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Skills Form */}
            {activeTab === "Skills" && (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Input id="skill" placeholder="e.g. React, TypeScript" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addSkill(); }} />
                  
                </div>
                <Button className="mt-2 bg-white text-black h-10 w-fit px-2 mx-auto" onClick={addSkill}>Add Skill</Button>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {data.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center bg-muted px-2 py-1 rounded text-sm">
                      {skill}
                      <Button variant="ghost" onClick={() => removeSkill(idx)}>&times;</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Projects Form */}
            {activeTab === "Projects" && (
              <div className="flex flex-col gap-2">
                <Input placeholder="Project Name" value={projInput.name} onChange={e => setProjInput(v => ({ ...v, name: e.target.value }))} />
                <Input placeholder="Description" value={projInput.description} onChange={e => setProjInput(v => ({ ...v, description: e.target.value }))} />
                <Input placeholder="Link (optional)" value={projInput.link} onChange={e => setProjInput(v => ({ ...v, link: e.target.value }))} />
                <Button className="mt-2 bg-white text-black h-10 w-fit px-2 mx-auto" onClick={addProject}>Add Project</Button>
                <ul className="mt-2 space-y-1">
                  {data.projects.map((proj) => (
                    <li key={proj.id} className="flex justify-between items-center text-sm bg-muted px-2 py-1 rounded">
                      <span>{proj.name}</span>
                      <Button variant="ghost" onClick={() => removeProject(proj.id)}>Remove</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Positions of Responsibility Form */}
            {activeTab === "Positions of Responsibility" && (
              <div className="flex flex-col gap-2">
                <Input placeholder="Title" value={posInput.title} onChange={e => setPosInput(v => ({ ...v, title: e.target.value }))} />
                <Input placeholder="Organization" value={posInput.organization} onChange={e => setPosInput(v => ({ ...v, organization: e.target.value }))} />
                <Input placeholder="Start Date" value={posInput.startDate} onChange={e => setPosInput(v => ({ ...v, startDate: e.target.value }))} />
                <Input placeholder="End Date" value={posInput.endDate} onChange={e => setPosInput(v => ({ ...v, endDate: e.target.value }))} />
                <Input placeholder="Description" value={posInput.description} onChange={e => setPosInput(v => ({ ...v, description: e.target.value }))} />
                <Button className="mt-2 bg-white text-black h-10 w-fit px-2 mx-auto" onClick={addPosition}>Add Position of Responsibility</Button>
                <ul className="mt-2 space-y-1">
                  {data.positionsOfResponsibility.map((pos) => (
                    <li key={pos.id} className="flex justify-between items-center text-sm bg-muted px-2 py-1 rounded">
                      <span>{pos.title} - {pos.organization}</span>
                      <Button variant="ghost" onClick={() => removePosition(pos.id)}>Remove</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Extra-curriculars & Achievements Form */}
            {activeTab === "Extra-curriculars & Achievements" && (
              <div className="flex flex-col gap-2">
                <Input placeholder="Title" value={extraInput.title} onChange={e => setExtraInput(v => ({ ...v, title: e.target.value }))} />
                <Input placeholder="Description" value={extraInput.description} onChange={e => setExtraInput(v => ({ ...v, description: e.target.value }))} />
                <Input placeholder="Date (optional)" value={extraInput.date} onChange={e => setExtraInput(v => ({ ...v, date: e.target.value }))} />
                <Button className="mt-2 bg-white text-black h-10 w-fit px-2 mx-auto" onClick={addExtra}>Add Extra-curriculars & Achievements</Button>
                <ul className="mt-2 space-y-1">
                  {data.extraCurriculars.map((extra) => (
                    <li key={extra.id} className="flex justify-between items-center text-sm bg-muted px-2 py-1 rounded">
                      <span>{extra.title}</span>
                      <Button variant="ghost" onClick={() => removeExtra(extra.id)}>Remove</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Panel: Live Preview */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="w-full flex justify-center items-center" ref={printRef}>
            <div className="w-full max-w-[700px] mx-auto">
              <MinimalistTemplate data={data} />
            </div>
          </div>
          <Button variant="default" className="mt-2 w-full max-w-xs" onClick={handlePrint}>
            Export as PDF
          </Button>
        </div>
      </div>
    </div>
  );
} 