'use client';

import CardEditFooter, { CardEditHeader, EditButton } from '@/components/card-edit';
import ToggleInput from '@/components/toggle-input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Checkbox from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SlashIcon } from '@radix-ui/react-icons';
import { useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import { toast } from 'sonner';
import { EditModes, type UserData } from './types';
import { isEmpty } from '@/lib/utils';
import CardEdit from '@/components/card-edit';

const Build = () => {
  const [isPageEditMode, setisPageEditMode] = useState<boolean>(false);
  const [editCard, setEditCard] = useState<string>('');
  const [editMode, setEditMode] = useState<EditModes>(EditModes.NONE);
  const [tempData, setTempData] = useState<UserData>(null);
  const [data, setData] = useState<UserData>({
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

  const inputRefs = {
    [EditModes.NAME]: useRef<HTMLInputElement>(null),
    [EditModes.JOB_TITLE]: useRef<HTMLInputElement>(null),
  };

  const handleEditClick = (mode: EditModes) => {
    setEditMode(mode);
    // @ts-ignore
    inputRefs[mode]?.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onSave(e);
      setEditCard('');
    }
  };

  const onSave = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setEditMode(EditModes.NONE);
    e.currentTarget.blur();
    showToast();
  };

  const showToast = () => {
    toast(
      'Changes saved' /* {
      description: 'lorem',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    } */,
    );
  };

  const handleValueChange = ({ e, label }: { e: ChangeEvent<HTMLInputElement>; label: string }) => {
    // @ts-ignore
    setData({ ...data, [label]: e.target.value });
  };

  const fields = [
    {
      mode: EditModes.NAME,
      value: data!.name,
      label: 'name',
      variant: 'h1',
    },
    {
      mode: EditModes.JOB_TITLE,
      value: data!.jobTitle,
      label: 'jobTitle',
      variant: 'h2',
    },
    // {
    //   mode: EditModes.PHONE_NUMBER,
    //   value: data!.phoneNumber,
    //   label: 'phoneNumber',
    //   variant: 'p',
    // },
    // {
    //   mode: EditModes.EMAIL,
    //   value: data!.email,
    //   label: 'email',
    //   variant: 'p',
    // },
    // {
    //   mode: EditModes.SKILLS,
    //   value: data!.languages,
    //   label: 'languages',
    //   variant: 'p',
    // },
    // {
    //   mode: EditModes.SUMMARY,
    //   value: data!.summary,
    //   label: 'summary',
    //   variant: 'p',
    // },
    // {
    //   mode: EditModes.EXPERIENCE,
    //   value: data!.experience,
    //   label: 'experience',
    //   variant: 'p',
    // },
    // {
    //   mode: EditModes.PROJECTS,
    //   value: data!.projects,
    //   label: 'projects',
    //   variant: 'p',
    // },
  ];

  const onCancelEditCard = () => {
    setEditCard('');
  };

  const onSaveEditCard = () => {
    setEditCard('');
  };

  const NoData = ({ children }: { children: ReactNode }) => {
    return <p className='text-gray-400'>{children}</p>;
  };

  const isEditContact = editCard === 'Contact';
  const isEditSummary = editCard === 'My Profile';
  const isEditSkills = editCard === 'Skills';

  const RenderBreadCrumb = () => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href='/build'>Build</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <div onKeyDown={handleKeyDown} className='pt-14 w-full'>
      <div className='container space-y-4'>
        <RenderBreadCrumb />

        <Card>
          {/* Name, Job Title */}
          <CardHeader>
            {fields.slice(0, 2).map(({ mode, value, label, variant }) => (
              <ToggleInput
                key={mode}
                isEdit={editMode === mode}
                variant={variant}
                label={label}
                value={value}
                handleValueChange={handleValueChange}
                handleEditClick={handleEditClick}
                inputRefs={inputRefs}
                mode={mode}
              />
            ))}
          </CardHeader>

          <CardContent>
            <div className='grid grid-cols-4 gap-4'>
              <Card className={`${isEditContact ? 'border-blue-500' : ''}`}>
                <CardEditHeader setCardEdit={setEditCard} title='Contact' />
                <CardContent>
                  <div className='space-y-4'>
                    <div className='space-y-1'>
                      <Label>Location</Label>
                      {isEditContact ? (
                        <Input
                          value={data?.location}
                          onChange={(e) => handleValueChange({ e, label: 'location' })}
                          placeholder='Ulaanbaatar, Mongolia'
                          className='w-full'
                        />
                      ) : (
                        <>{isEmpty(data?.location) ? <NoData>(no location)</NoData> : <p>{data?.location}</p>}</>
                      )}
                    </div>

                    <div className='flex items-center space-x-2'>
                      <Checkbox id='relocation' />
                      <Label>I’m open to relocation</Label>
                    </div>

                    <div className='space-y-1'>
                      <Label>Phone Number</Label>

                      {isEditContact ? (
                        <Input
                          // @ts-ignore
                          value={data?.phoneNumber}
                          type='number'
                          onChange={(e) => handleValueChange({ e, label: 'phoneNumber' })}
                          placeholder='+976 88650115'
                          className='w-full'
                        />
                      ) : (
                        <>{isEmpty(data?.phoneNumber) ? <NoData>(no phone)</NoData> : <p>{data?.phoneNumber}</p>}</>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardEditFooter condition={isEditContact} onSave={onSaveEditCard} onCancel={onCancelEditCard} />
              </Card>

              {/* <Card className={`${isEditSummary ? 'border-blue-500' : ''} col-span-3`}>
                <CardEditHeader setCardEdit={setEditCard} title='My Profile' />
                <CardContent>
                  {isEditSummary ? (
                    <Input value={data?.summary} onChange={(e) => handleValueChange({ e, label: 'summary' })} className='w-full' />
                  ) : (
                    <p>{data?.summary ?? '(no summary)'}</p>
                  )}
                </CardContent>
                <CardEditFooter condition={isEditSummary} onSave={onSaveEditCard} onCancel={onCancelEditCard} />
              </Card> */}

              {/* <Card className={`${isEditSkills ? 'border-blue-500' : ''}`}>
                <CardEditHeader setCardEdit={setEditCard} title='Skills' />
                <CardContent></CardContent>
                <CardEditFooter condition={isEditSkills} onSave={onSaveEditCard} onCancel={onCancelEditCard} />
              </Card> */}

              {/* <Card className='col-span-3'>
                <CardHeader>Experience</CardHeader>
                <CardContent></CardContent>
              </Card>
              <Card>
                <CardHeader>Languages</CardHeader>
                <CardContent></CardContent>
              </Card> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Build;
