import { type CoreLogic, type ResumeData } from '@/app/build/types';
import CardEditFooter, { CardEditHeader } from '@/components/card-edit';
import { Card, CardContent } from '@/components/ui/card';
import Input from '@/components/ui/input-custom';

type MyProfileProps = {
  l: CoreLogic;
  data: ResumeData;
};

const MyProfile: React.FC<MyProfileProps> = ({ data, l }): JSX.Element => {
  return (
    <Card className={`${l.isEditSummary ? 'border-blue-500' : ''} col-span-3`}>
      <CardEditHeader setCardEdit={l.setEditCard} title='My Profile' />
      <CardContent>
        {l.isEditSummary ? (
          <Input
            value={data?.summary}
            onChange={(e) => l.handleValueChange({ e, label: 'summary' })}
            className='w-full'
          />
        ) : (
          <p>{data?.summary ?? '(no summary)'}</p>
        )}
      </CardContent>
      <CardEditFooter
        condition={l.isEditSummary}
        onSave={l.onSaveEditCard}
        onCancel={l.onCancelEditCard}
      />
    </Card>
  );
};

export default MyProfile;
