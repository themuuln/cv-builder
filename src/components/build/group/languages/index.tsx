import type { CoreLogic } from '@/app/build/logic';
import type { ResumeData } from '@/app/build/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

type LanguagesProps = {
  data: ResumeData;
  l: CoreLogic;
};

const Languages: React.FC<LanguagesProps> = ({ data, l }): JSX.Element => {
  return (
    <Card className='col-span-3'>
      <CardHeader>Experience</CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default Languages;
