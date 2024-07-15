import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import { EditModes, type ResumeData } from "./types";

type CoreLogic = {
  editMode: EditModes;
  editCard: string;
  data: ResumeData;
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
  setEditCard: Dispatch<SetStateAction<string>>;
  onSaveEditCard: () => void;
  onCancelEditCard: () => void;
  isEditSummary: boolean;
  isEditSkills: boolean;
};

const useLogic = (): CoreLogic => {
  const [editCard, setEditCard] = useState<string>("");
  const [editMode, setEditMode] = useState<EditModes>(EditModes.NONE);
  const [tempData, setTempData] = useState<ResumeData>(null);
  const [data, setData] = useState<ResumeData>({
    name: "",
    jobTitle: "",
    location: "",
    phoneNumber: null,
    email: "",
    languages: "",
    education: [],
    summary: "",
    experience: [],
    projects: [],
    skills: { languages: [""], technologies: [""], tools: [""] },
  });

  const handleEditClick = (mode: EditModes) => {
    setEditMode(mode);
    // TODO: Add auto focus on input
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      onSave(e);
      setEditCard("");
    }
  };

  const onSave = (e: KeyboardEvent<HTMLInputElement>) => {
    setEditMode(EditModes.NONE);
    e.currentTarget.blur();
    showToast();
  };

  const showToast = () => {
    toast("Changes saved", {
      description: `Your latest changes on ${EditModes[editMode]} were saved!`,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  const handleValueChange = ({
    e,
    label,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    label: string;
  }) => {
    // @ts-ignore
    setData({ ...data, [label]: e.target.value });
  };

  const onCancelEditCard = () => {
    setEditCard("");
  };

  const onSaveEditCard = () => {
    setEditCard("");
  };

  const isEditContact = editCard === "Contact";
  const isEditSummary = editCard === "My Profile";
  const isEditSkills = editCard === "Skills";

  return {
    editMode,
    editCard,
    data,
    handleKeyDown,
    handleValueChange,
    handleEditClick,
    isEditContact,
    setEditCard,
    onSaveEditCard,
    onCancelEditCard,
    isEditSummary,
    isEditSkills,
  };
};

export default useLogic;
