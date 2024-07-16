'use client';

import { TrashIcon, PlusIcon } from '@radix-ui/react-icons';
import { type CoreLogic, type ResumeData } from '@/app/build/types';
import CardEditFooter, { CardEditHeader } from '@/components/card-edit';
import Button from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import NoData from '../../no-data';

type SkillsProps = {
  l: CoreLogic;
  data: ResumeData;
};

const renderSkills = ({ l }: { l: CoreLogic }) => {
  if (l.data?.skills.length === 0) {
    return <NoData>(no skills)</NoData>;
  }
  return l.data!.skills.map((skill, index) => {
    const removeSkill = async () => {
      // @ts-ignore
      await l.setData({
        ...l.data,
        skills: l.data!.skills.filter((_, i) => i !== index),
      });
      toast('Skill removed successfully');
    };
    return l.isEditSkills ? (
      <div key={index} className='flex flex-row gap-2'>
        <Input
          value={skill}
          onChange={(e) => {
            // @ts-ignore
            l.setData({
              ...l.data,
              skills: [
                ...l.data!.skills.slice(0, index),
                e.target.value,
                ...l.data!.skills.slice(index + 1),
              ],
            });
          }}
        />
        {skill.length !== 0 ? (
          <Button onClick={removeSkill}>
            <TrashIcon />
          </Button>
        ) : (
          <></>
        )}
      </div>
    ) : (
      <p key={index}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</p>
    );
  });
};

const Skills: React.FC<SkillsProps> = ({ data, l }): JSX.Element => {
  const addNewSkill = () => {
    const skills = l.data!.skills;
    if (!skills.some((skill) => skill.trim() === '')) {
      // @ts-ignore
      l.setData({
        ...l.data,
        skills: [...skills, ''],
      });
    } else {
      toast('Please fill in all skills before adding a new one');
    }
  };

  return (
    <Card className={`${l.isEditSkills ? 'border-blue-500' : ''}`}>
      <CardEditHeader setCardEdit={l.setEditCard} title='Skills' />
      <CardContent className='space-y-2'>
        {renderSkills({ l })}
        {l.isEditSkills && (
          <Button
            className='w-full space-x-1'
            variant={'outline'}
            onClick={addNewSkill}
          >
            <PlusIcon /> <p>Add Skill</p>
          </Button>
        )}
      </CardContent>
      <CardEditFooter
        condition={l.isEditSkills}
        onSave={() => {
          l.onSaveEditCard();
          l.saveData();
        }}
        onCancel={l.onCancelEditCard}
      />
    </Card>
  );
};

export default Skills;
