import type { CoreLogic, ResumeData } from '@/app/build/types';
import { CardEditFooter, UniversalCardHeader } from '@/components/card-edit';
import { CreateExperienceCard } from '@/components/experience';
import Button from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusIcon } from '@radix-ui/react-icons';

type ExperienceProps = {
  data: ResumeData;
  l: CoreLogic;
};

const Experience: React.FC<ExperienceProps> = ({ data, l }): JSX.Element => {
  return (
    <Card
      className={`${l.isEditExperience ? 'border-blue-500' : ''} md:col-span-3`}
    >
      <UniversalCardHeader setCardEdit={l.setEditCard} title='Experience' />
      <CardContent className='grid gap-2 md:gap-4 md:grid-cols-2'>
        {data!.experience?.map((experience, index) => (
          <CreateExperienceCard
            l={l}
            isEdit={l.isEditExperience}
            item={experience}
            key={index}
          />
        ))}
        {l.isEditExperience ? (
          <Card>
            <CardContent className='flex items-center justify-center h-full'>
              <Button variant={'outline'}>
                <PlusIcon />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <></>
        )}
      </CardContent>
      <CardEditFooter
        condition={l.isEditExperience}
        onCancel={l.onCancelEditCard}
        onSave={l.onSaveEditCard}
      />
    </Card>
  );
};

export default Experience;
