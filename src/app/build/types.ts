export enum EditModes {
  NONE,
  NAME,
  JOB_TITLE,
  LOCATION,
  PHONE_NUMBER,
  EMAIL,
  SKILLS,
  SUMMARY,
  EXPERIENCE,
  PROJECTS,
}

export type UserData = {
  name: string;
  jobTitle: string;
  location: string;
  phoneNumber: number | null;
  email: string;
  languages: string;
  education: {
    field: string;
    school: string;
    degree: string;
    startDate: Date;
    endDate: Date;
  }[];
  summary: string;
  experience: {
    company: string;
    position: string;
    usedSkills: string[];
    description: string[];
    startDate: Date;
    endDate: Date;
  }[];
  projects: {
    name: string;
    usedSkills: string[];
    description: string[];
    startDate: Date;
    endDate: Date;
    link: string;
  }[];
  skills: {
    languages: string[];
    technologies: string[];
    tools: string[];
  };
} | null;
