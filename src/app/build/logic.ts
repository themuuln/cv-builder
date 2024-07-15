import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type KeyboardEvent,
  type RefObject,
  type SetStateAction,
} from 'react';
import { toast } from 'sonner';
import { EditModes, type ResumeData } from './types';
import { supabase } from '@/lib/initSupabase';
import useAuth from '@/hooks/useAuth';

export type CoreLogic = {
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
  inputRefsList: Record<EditModes, RefObject<HTMLInputElement>>;
};

const useLogic = (): CoreLogic => {
  const { user } = useAuth();
  const [editCard, setEditCard] = useState<string>('');
  const [editMode, setEditMode] = useState<EditModes>(EditModes.NONE);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [data, setData] = useState<ResumeData>({
    name: '',
    jobTitle: '',
    location: '',
    phoneNumber: null,
    email: '',
    languages: '',
    education: [],
    summary: '',
    experience: [],
    projects: [],
    skills: { languages: [''], technologies: [''], tools: [''] },
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const jobTitleInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const skillsInputRef = useRef<HTMLInputElement>(null);
  const summaryInputRef = useRef<HTMLInputElement>(null);
  const experienceInputRef = useRef<HTMLInputElement>(null);
  const projectsInputRef = useRef<HTMLInputElement>(null);

  const inputRefsList: Record<EditModes, RefObject<HTMLInputElement>> = {
    [EditModes.NONE]: { current: null } as RefObject<HTMLInputElement>,
    [EditModes.NAME]: nameInputRef,
    [EditModes.JOB_TITLE]: jobTitleInputRef,
    [EditModes.LOCATION]: locationInputRef,
    [EditModes.PHONE_NUMBER]: phoneNumberInputRef,
    [EditModes.EMAIL]: emailInputRef,
    [EditModes.SKILLS]: skillsInputRef,
    [EditModes.SUMMARY]: summaryInputRef,
    [EditModes.EXPERIENCE]: experienceInputRef,
    [EditModes.PROJECTS]: projectsInputRef,
  };

  const handleEditClick = async (mode: EditModes) => {
    await setEditMode(mode);
    inputRefsList[mode]?.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onSave(e);
      setEditCard('');
    }
  };

  const onSave = (e: KeyboardEvent<HTMLInputElement>) => {
    saveData();
    setEditMode(EditModes.NONE);
    e.currentTarget.blur();
    showToast();
  };

  const showToast = () => {
    toast('Changes saved', {
      description: `Your latest changes on ${EditModes[editMode]} were saved!`,
      action: {
        label: 'Undo',
        onClick: () => {
          // TODO: finish undo
          console.log('Undo');
        },
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
    setEditCard('');
  };

  const onSaveEditCard = () => {
    setEditCard('');
  };

  const saveData = () => {
    console.log(`💻 ~ file: logic.ts:137 ~ saveData ~ data:`, data);
    // @ts-ignore
    const { error } = supabase
      .from('resume-data')
      .upsert(data)
      .eq('owner', user.id);

    console.log(`💻 ~ file: logic.ts:133 ~ saveData ~ error:`, error);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!hasFetched && user?.id) {
        const { data, error } = await supabase
          .from('resume-data')
          .select('*')
          .eq('owner', user.id);

        if (error) {
          toast.error('Error fetching data');
          return;
        }

        console.log(`💻 ~ file: logic.ts:151 ~ fetchData ~ data:`, data);
        setData(data[0]);
      }
    };

    fetchData().then(() => setHasFetched(true));
  }, [supabase, hasFetched, user]);

  const isEditContact = editCard === 'Contact';
  const isEditSummary = editCard === 'My Profile';
  const isEditSkills = editCard === 'Skills';

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
    inputRefsList,
  };
};

export default useLogic;
