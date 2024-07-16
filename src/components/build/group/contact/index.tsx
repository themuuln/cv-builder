import { EditModes, type CoreLogic, type ResumeData } from '@/app/build/types';
import CardEditFooter, { CardEditHeader } from '@/components/card-edit';
import { Card, CardContent } from '@/components/ui/card';
import Checkbox from '@/components/ui/checkbox';
import Input from '@/components/ui/input-custom';
import { Label } from '@/components/ui/label';
import { isEmpty } from '@/lib/utils';
import type { FC } from 'react';
import NoData from '../../no-data';
import Skeleton from '@/components/ui/skeleton';

type ContactProps = {
  l: CoreLogic;
  data: ResumeData;
};

const Contact: FC<ContactProps> = ({ l, data }): JSX.Element => {
  return (
    <Card className={`${l.isEditContact ? 'border-blue-500' : ''}`}>
      <CardEditHeader setCardEdit={l.setEditCard} title='Contact' />
      <CardContent>
        <div className='space-y-4'>
          <div className='space-y-1'>
            <Label>Location</Label>
            {l.isEditContact ? (
              <Input
                ref={l.inputRefsList[EditModes.LOCATION]}
                value={data?.location}
                onChange={(e) => l.handleValueChange({ e, label: 'location' })}
                placeholder='Ulaanbaatar, Mongolia'
                className='w-full'
              />
            ) : (
              <>
                {l.isLoading.value ? (
                  <Skeleton className='h-[20px] w-[150px]' />
                ) : isEmpty(data?.location) ? (
                  <NoData>(no location)</NoData>
                ) : (
                  <p>{data?.location}</p>
                )}
              </>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              checked={data?.isRelocate}
              onCheckedChange={(e) => {
                // @ts-ignore
                l.setData({ ...l.data, isRelocate: e });
                l.saveData();
              }}
              id='relocation'
            />
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
                {l.isLoading.value ? (
                  <Skeleton className='h-[20px] w-[100px]' />
                ) : isEmpty(data?.phoneNumber) ? (
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
  );
};

export default Contact;
