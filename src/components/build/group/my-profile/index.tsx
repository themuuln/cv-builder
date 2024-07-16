import { type CoreLogic, type ResumeData } from '@/app/build/types';
import { UniversalCardHeader, CardEditFooter } from '@/components/card-edit';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type MyProfileProps = {
  l: CoreLogic;
  data: ResumeData;
};

const MyProfile: React.FC<MyProfileProps> = ({ data, l }): JSX.Element => {
  return (
    <Card
      className={`${l.isEditSummary ? 'border-blue-500' : ''} md:col-span-3`}
    >
      <UniversalCardHeader setCardEdit={l.setEditCard} title='My Profile' />
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
