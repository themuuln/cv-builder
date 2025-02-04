import { EditModes, type CoreLogic, type ResumeData } from '@/app/build/types';
import ToggleInput from '@/components/toggle-input';
import { CardHeader } from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';

type HeadingProps = {
  data: ResumeData;
  l: CoreLogic;
};

const Heading: React.FC<HeadingProps> = ({ data, l }): JSX.Element => {
  return (
    <CardHeader>
      {l.isLoading.value ? (
        <div className='flex flex-col space-y-2'>
          <Skeleton className='w-[140px] h-[30px]' />
          <Skeleton className='w-[240px] h-[30px]' />
        </div>
      ) : (
        [
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
            inputRefsList={l.inputRefsList}
            mode={mode}
          />
        ))
      )}
    </CardHeader>
  );
};

export default Heading;
