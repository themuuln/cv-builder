'use client';

import CardEditFooter, { CardEditHeader } from '@/components/card-edit';
import { Container } from '@/components/template';
import ToggleInput from '@/components/toggle-input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Checkbox from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isEmpty } from '@/lib/utils';
import { type ReactNode } from 'react';
import { EditModes } from './types';
import useLogic from './logic';

const NoData = ({ children }: { children: ReactNode }) => {
  return <p className='text-gray-400'>{children}</p>;
};

const Build = () => {
  const l = useLogic();
  const { data } = l;
  const color = 'red';

  if ('red' === color) {
    console.log(color);
  }

  return (
    <div onKeyDown={l.handleKeyDown} className='md:pt-4 w-full'>
      <Container className='space-y-4'>
        <Card>
          {/* Name, Job Title */}
          <CardHeader>
            {[
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
            ].map(({ mode, value, label, variant }) => (
              <ToggleInput
                key={mode}
                isEdit={l.editMode === mode}
                variant={variant}
                label={label}
                value={value}
                handleValueChange={l.handleValueChange}
                handleEditClick={l.handleEditClick}
                // TODO: Add inputrefs
                // inputRefs={}
                mode={mode}
              />
            ))}
          </CardHeader>

          <CardContent>
            <div className='grid grid-cols-4 gap-4'>
              <Card className={`${l.isEditContact ? 'border-blue-500' : ''}`}>
                <CardEditHeader setCardEdit={l.setEditCard} title='Contact' />
                <CardContent>
                  <div className='space-y-4'>
                    <div className='space-y-1'>
                      <Label>Location</Label>
                      {l.isEditContact ? (
                        <Input
                          value={data?.location}
                          onChange={(e) =>
                            l.handleValueChange({ e, label: 'location' })
                          }
                          placeholder='Ulaanbaatar, Mongolia'
                          className='w-full'
                        />
                      ) : (
                        <>
                          {isEmpty(data?.location) ? (
                            <NoData>(no location)</NoData>
                          ) : (
                            <p>{data?.location}</p>
                          )}
                        </>
                      )}
                    </div>

                    <div className='flex items-center space-x-2'>
                      <Checkbox id='relocation' />
                      <Label>I’m open to relocation</Label>
                    </div>

                    <div className='space-y-1'>
                      <Label>Phone Number</Label>

                      {l.isEditContact ? (
                        <Input
                          // @ts-ignore
                          value={data?.phoneNumber}
                          type='number'
                          onChange={(e) =>
                            l.handleValueChange({ e, label: 'phoneNumber' })
                          }
                          placeholder='+976 88650115'
                          className='w-full'
                        />
                      ) : (
                        <>
                          {isEmpty(data?.phoneNumber) ? (
                            <NoData>(no phone)</NoData>
                          ) : (
                            <p>{data?.phoneNumber}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardEditFooter
                  condition={l.isEditContact}
                  onSave={l.onSaveEditCard}
                  onCancel={l.onCancelEditCard}
                />
              </Card>

              <Card
                className={`${l.isEditSummary ? 'border-blue-500' : ''} col-span-3`}
              >
                <CardEditHeader
                  setCardEdit={l.setEditCard}
                  title='My Profile'
                />
                <CardContent>
                  {l.isEditSummary ? (
                    <Input
                      value={data?.summary}
                      onChange={(e) =>
                        l.handleValueChange({ e, label: 'summary' })
                      }
                      className='w-full'
                    />
                  ) : (
                    <p>{data?.summary ?? '(no summary)'}</p>
                  )}
                </CardContent>
                <CardEditFooter
                  condition={l.isEditSummary}
                  onSave={l.onSaveEditCard}
                  onCancel={l.onCancelEditCard}
                />
              </Card>

              <Card className={`${l.isEditSkills ? 'border-blue-500' : ''}`}>
                <CardEditHeader setCardEdit={l.setEditCard} title='Skills' />
                <CardContent></CardContent>
                <CardEditFooter
                  condition={l.isEditSkills}
                  onSave={l.onSaveEditCard}
                  onCancel={l.onCancelEditCard}
                />
              </Card>

              <Card className='col-span-3'>
                <CardHeader>Experience</CardHeader>
                <CardContent></CardContent>
              </Card>
              <Card>
                <CardHeader>Languages</CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Build;
