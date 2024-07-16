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
  skills: string[];
} | null;

export type InputRefType = ElementRef<'input'>;

export type CoreLogic = {
  editMode: EditModes;
  editCard: string;
  data: ResumeData;
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
  isEditContact: boolean;
  setEditCard: Dispatch<SetStateAction<CardList>>;
  onSaveEditCard: () => void;
  onCancelEditCard: () => void;
  isEditSummary: boolean;
  isEditSkills: boolean;
  isEditLanguages: boolean;
  inputRefsList: Record<EditModes, RefObject<HTMLInputElement>>;
  isLoading: LoadingType;
  setIsLoading: Dispatch<SetStateAction<LoadingType>>;
  saveData: () => void;
};

export type LoadingType = {
  value: boolean;
  action: boolean;
  hasFetched: boolean;
};
