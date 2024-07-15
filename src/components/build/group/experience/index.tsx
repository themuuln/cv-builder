import type {  CoreLogic, ResumeData } from '@/app/build/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

type ExperienceProps = {
  data: ResumeData;
  l: CoreLogic;
};

const Experience: React.FC<ExperienceProps> = ({ data, l }): JSX.Element => {
  return (
    <Card className='col-span-3'>
      <CardHeader>Experience</CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default Experience;
