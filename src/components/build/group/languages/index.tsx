'use client';

import { type CoreLogic, type ResumeData } from '@/app/build/types';
import { CardEditFooter, UniversalCardHeader } from '@/components/card-edit';
import Button from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  CaretDownIcon,
  CaretUpIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { toast } from 'sonner';
import NoData from '../../no-data';

type LanguagesProps = {
  l: CoreLogic;
  data: ResumeData;
};

const renderLanguages = ({ l }: { l: CoreLogic }) => {
  if (l.data?.languages?.length === 0) {
    return <NoData>(no languages)</NoData>;
  }
  return l.data!.languages?.map((language, index) => {
    const removeLanguage = async () => {
      // @ts-ignore
      await l.setData({
        ...l.data,
        languages: l.data!.languages?.filter((_, i) => i !== index),
      });
      toast('Language removed successfully');
    };
    return l.isEditLanguages ? (
      <div key={index} className='flex flex-row items-center gap-2'>
        <div className='flex flex-col space-y-1'>
          <div
            onClick={() => {
              const newLanguages = [...l.data!.languages];
              const temp = newLanguages[index];
              newLanguages[index] = newLanguages[index - 1];
              newLanguages[index - 1] = temp;
              // @ts-ignore
              l.setData({ ...l.data, languages: newLanguages });
            }}
            className='cursor-pointer'
          >
            <CaretUpIcon className='h-4 w-4' />
          </div>
          <div
            onClick={() => {
              const newLanguages = [...l.data!.languages];
              const temp = newLanguages[index];
              newLanguages[index] = newLanguages[index + 1];
              newLanguages[index + 1] = temp;
              // @ts-ignore
              l.setData({ ...l.data, languages: newLanguages });
            }}
            className='cursor-pointer'
          >
            <CaretDownIcon className='h-4 w-4' />
          </div>
        </div>
        <Input
          value={language}
          onChange={(e) => {
            // @ts-ignore
            l.setData({
              ...l.data,
              languages: [
                ...l.data!.languages.slice(0, index),
                e.target.value,
                ...l.data!.languages.slice(index + 1),
              ],
            });
          }}
        />
        {language.length !== 0 ? (
          <Button onClick={removeLanguage}>
            <TrashIcon />
          </Button>
        ) : (
          <></>
        )}
      </div>
    ) : (
      <p key={index}>{language.charAt(0).toUpperCase() + language.slice(1)}</p>
    );
  });
};

const Languages: React.FC<LanguagesProps> = ({ data, l }): JSX.Element => {
  const addNewLanguage = () => {
    const languages = l.data!.languages;
    if (!languages?.some((language) => language.trim() === '')) {
      // @ts-ignore
      l.setData({
        ...l.data,
        languages: [...languages, ''],
      });
    } else {
      toast('Please fill in all languages before adding a new one');
    }
  };

  return (
    <Card className={`${l.isEditLanguages ? 'border-blue-500' : ''}`}>
      <UniversalCardHeader setCardEdit={l.setEditCard} title='Languages' />
      <CardContent className='space-y-2'>
        {renderLanguages({ l })}
        {l.isEditLanguages && (
          <Button
            className='w-full space-x-1'
            variant={'outline'}
            onClick={addNewLanguage}
          >
            <PlusIcon /> <p>Add Language</p>
          </Button>
        )}
      </CardContent>
      <CardEditFooter
        condition={l.isEditLanguages}
        onSave={() => {
          l.onSaveEditCard();
          l.saveData();
        }}
        onCancel={l.onCancelEditCard}
      />
    </Card>
  );
};

export default Languages;
