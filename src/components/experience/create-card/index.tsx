import type {
  CoreLogic,
  ExperienceKeys,
  ExperienceType,
} from '@/app/build/types';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ChangeEvent, FocusEvent } from 'react';
import React, { useCallback, useState } from 'react';

type CreateExperienceCardProps = {
  item: ExperienceType;
  isEdit: boolean;
  l: CoreLogic;
};

const CreateExperienceCard: React.FC<CreateExperienceCardProps> = ({
  item,
  isEdit,
  l,
}): JSX.Element => {
  const onBlurInput = useCallback(
    (value: string, key: ExperienceKeys) => {
      l.setData({
        ...l.data,
        experience: l.data?.experience?.map((exp: ExperienceType) =>
          exp.company === item.company ? { ...exp, [key]: value } : exp,
        ),
      });
    },
    [l, item.company],
  );

  type InputWithLabelProps = {
    label: string;
    name: ExperienceKeys;
    initialValue: string;
    onBlur: (value: string, key: ExperienceKeys) => void;
  };

  const InputWithLabel = ({
    label,
    name,
    initialValue,
    onBlur,
  }: InputWithLabelProps) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      onBlur(e.target.value, name);
    };

    return (
      <>
        <Label>{label}</Label>
        <Input
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      </>
    );
  };

  return (
    <Card>
      <CardHeader>
        {isEdit ? (
          <div className='flex flex-col gap-2'>
            <InputWithLabel
              label={'Company'}
              name={'company'}
              initialValue={item.company}
              onBlur={onBlurInput}
            />

            <div className='flex flex-row gap-2'>
              <div>
                <InputWithLabel
                  label={'Start Date'}
                  name={'startDate'}
                  initialValue={item.startDate}
                  onBlur={onBlurInput}
                />
              </div>

              <div className=''>
                <InputWithLabel
                  label={'End Date'}
                  name={'endDate'}
                  initialValue={item.endDate}
                  onBlur={onBlurInput}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className='font-semibold'>
              {item?.company}{' '}
              <span className='font-normal text-neutral-500 md:text-sm'>
                {`${item.startDate} - ${item.endDate}`}
              </span>
            </p>
            {item?.position}
          </>
        )}

        <ul className='list-disc pl-5'>
          {item.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
        <div className='mt-2'>
          <p className='font-semibold'>Skills:</p>
          <p>{item.usedSkills.join(', ')}</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default CreateExperienceCard;
