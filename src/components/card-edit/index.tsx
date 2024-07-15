import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { CardFooter, CardHeader } from '@/components/ui/card';

export const EditButton = ({
  setEditCard,
  type,
}: {
  setEditCard: Dispatch<SetStateAction<string>>;
  type: string;
}) => {
  return (
    <div
      className='p-2 rounded transition-all duration-300  hover:bg-[#f5f7fa]'
      onClick={() => setEditCard(type)}
    >
      <svg
        width='15'
        height='15'
        viewBox='0 0 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z'
          fill='currentColor'
          fillRule='evenodd'
          clipRule='evenodd'
        ></path>
      </svg>
    </div>
  );
};

const CardEditFooter = ({
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

export const CardEditHeader = ({
  setCardEdit,
  title,
}: {
  setCardEdit: Dispatch<SetStateAction<string>>;
  title: string;
}) => {
  return (
    <CardHeader>
      <div className='flex items-center flex-row justify-between'>
        <div>{title}</div>
        <EditButton setEditCard={setCardEdit} type={title} />
      </div>
    </CardHeader>
  );
};

export default CardEditFooter;
