import { create } from "zustand";
import { ResumeData, PersonalInfo } from "./types";

interface ResumeState {
  data: ResumeData;
  setData: (data: ResumeData) => void;
  updateSection: <K extends keyof ResumeData>(section: K, value: ResumeData[K]) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
}

const initialData: ResumeData = {
  personalInfo: {
    name: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  positionsOfResponsibility: [],
  extraCurriculars: [],
};

export const useResumeStore = create<ResumeState>((set) => ({
  data: initialData,
  setData: (data) => set({ data }),
  updateSection: (section, value) => set((state) => ({
    data: { ...state.data, [section]: value },
  })),
  updatePersonalInfo: (info) => set((state) => ({
    data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } },
  })),
})); 