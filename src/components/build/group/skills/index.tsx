import type { CoreLogic } from '@/app/build/logic';
import { type ResumeData } from '@/app/build/types';
import CardEditFooter, { CardEditHeader } from '@/components/card-edit';
import { Card, CardContent } from '@/components/ui/card';
import Input from '@/components/ui/input-custom';

type SkillsProps = {
  l: CoreLogic;
  data: ResumeData;
};

const Skills: React.FC<SkillsProps> = ({ data, l }): JSX.Element => {
  return (
    <Card className={`${l.isEditSkills ? 'border-blue-500' : ''}`}>
      <CardEditHeader setCardEdit={l.setEditCard} title='Skills' />
      <CardContent></CardContent>
      <CardEditFooter
        condition={l.isEditSkills}
        onSave={l.onSaveEditCard}
        onCancel={l.onCancelEditCard}
      />
    </Card>
  );
};

export default Skills;
