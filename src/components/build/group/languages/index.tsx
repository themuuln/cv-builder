import type { CoreLogic, ResumeData } from '@/app/build/types';
import { UniversalCardHeader } from '@/components/card-edit';
import { Card, CardContent } from '@/components/ui/card';

type LanguagesProps = {
  data: ResumeData;
  l: CoreLogic;
};

const Languages: React.FC<LanguagesProps> = ({ data, l }): JSX.Element => {
  return (
    <Card className='col-span-1'>
      <UniversalCardHeader setCardEdit={l.setEditCard} title='Languages' />
      <CardContent>
        {l.data?.languages?.map((language, i) => {
          return <p key={i}>{language}</p>;
        })}
      </CardContent>
    </Card>
  );
};

export default Languages;
