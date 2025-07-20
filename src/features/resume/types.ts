export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export type Skill = string;

export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  linkedin?: string;
  github?: string;
}

export interface PositionOfResponsibility {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface ExtraCurricular {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  positionsOfResponsibility: PositionOfResponsibility[];
  extraCurriculars: ExtraCurricular[];
} 