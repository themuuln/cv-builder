import type { CardList } from '@/app/build/types';
import { CardFooter, CardHeader } from '@/components/ui/card';
import { Pencil1Icon } from '@radix-ui/react-icons';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

export const CardEditFooter = ({
  condition,
  onCancel,
  onSave,
}: {
  condition: boolean;
  onCancel: () => void;
  onSave: () => void;
}) => {
  if (condition) {
    return (
      <CardFooter>
        <div className='flex border-t pt-4 flex-row justify-between w-full'>
          <Button onClick={onCancel} variant={'ghost'}>
            Cancel
          </Button>
          <Button onClick={onSave} variant={'ghost'}>
            Save
          </Button>
        </div>
      </CardFooter>
    );
  }
};

export const UniversalCardHeader = ({
  setCardEdit,
  title,
}: {
  setCardEdit: Dispatch<SetStateAction<CardList>>;
  title: CardList;
}) => {
  return (
    <CardHeader>
      <div className='flex items-center flex-row justify-between'>
        <div>
          <h2 className='md:text-xl font-semibold'>{title}</h2>
        </div>
        <div
          className='p-2 rounded transition-all duration-300 hover:text-primary-foreground hover:bg-primary'
          onClick={() => setCardEdit(title as CardList)}
        >
          <Pencil1Icon />
        </div>
      </div>
    </CardHeader>
  );
};
