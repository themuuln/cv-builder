import type { CoreLogic, ResumeData } from '@/app/build/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type LanguagesProps = {
  data: ResumeData;
  l: CoreLogic;
};

const Languages: React.FC<LanguagesProps> = ({ data, l }): JSX.Element => {
  return (
    <Card className='col-span-1'>
      <CardHeader>Languages</CardHeader>
      <CardContent>
        {l.data?.languages?.map((language, i) => {
          return <p key={i}>{language}</p>;
        })}
      </CardContent>
    </Card>
  );
};

export default Languages;
