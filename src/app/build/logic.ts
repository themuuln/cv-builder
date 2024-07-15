import useAuth from '@/hooks/useAuth';
import { supabase } from '@/lib/initSupabase';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type RefObject,
} from 'react';
import { toast } from 'sonner';
import { EditModes, type CoreLogic, type ResumeData } from './types';

const useLogic = (): CoreLogic => {
  const { user } = useAuth();
  const [editCard, setEditCard] = useState<string>('');
  const [editMode, setEditMode] = useState<EditModes>(EditModes.NONE);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [data, setData] = useState<ResumeData>({
    id: null,
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

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData().then(() => setHasFetched(true));
  }, [supabase, hasFetched, user]);

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
    onCancelEditCard();
  };

  const saveData = async () => {
    let response;
    if (data?.id) {
      response = await supabase
        .from('resume-data')
        .upsert(data)
        .eq('owner', user.id);
    } else {
      response = await supabase.from('resume-data').insert(data);
    }
    const { error } = response;

    if (error) {
      toast.error('Error saving data');
      return;
    }

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

    showToast();
  };

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
