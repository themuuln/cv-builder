import type {
  ChangeEvent,
  Dispatch,
  ElementRef,
  KeyboardEvent,
  RefObject,
  SetStateAction,
} from 'react';

export type CardList =
  | 'Contact'
  | 'My Profile'
  | 'Skills'
  | 'Experience'
  | 'Languages'
  | 'Projects'
  | '';

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

export type ExperienceType = {
  company: string;
  position: string;
  usedSkills: string[];
  description: string[];
  startDate: string;
  endDate: string;
};

export type ExperienceKeys = keyof ExperienceType;

export type ProjectsType = {
  name: string;
  usedSkills: string[];
  description: string[];
  startDate: string;
  endDate: string;
  link: string;
}[];

export type ResumeData = {
  id: string | null;
  name: string;
  jobTitle: string;
  location: string;
  isRelocate: boolean;
  phoneNumber: number | null;
  email: string;
  languages: string[];
  education: {
    field: string;
    school: string;
    degree: string;
    startDate: Date;
    endDate: Date;
  }[];
  summary: string;
  experience: ExperienceType[];
  projects: ProjectsType[];
  skills: string[];
} | null;

export type InputRefType = ElementRef<'input'>;

export type CoreLogic = {
  setEditCard: Dispatch<SetStateAction<CardList>>;
  onSaveEditCard: () => void;
  onCancelEditCard: () => void;
  setIsLoading: Dispatch<SetStateAction<LoadingType>>;
  saveData: () => void;
  setData: Dispatch<SetStateAction<ResumeData>>;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleValueChange: ({
    e,
    label,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    label: string;
  }) => void;
  handleEditClick: (mode: EditModes) => void;
  editMode: EditModes;
  editCard: string;
  data: ResumeData;
  inputRefsList: Record<EditModes, RefObject<HTMLInputElement>>;
  isLoading: LoadingType;
  isEditContact: boolean;
  isEditSummary: boolean;
  isEditSkills: boolean;
  isEditLanguages: boolean;
  isEditExperience: boolean;
  isEditProjects: boolean;
};

export type LoadingType = {
  value: boolean;
  action: boolean;
  hasFetched: boolean;
};
