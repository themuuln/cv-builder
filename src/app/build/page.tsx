'use client';

import { Heading } from '@/components/build';
import * as Group from '@/components/build/group';
import { Container, GridContainer } from '@/components/template';
import { Card, CardContent } from '@/components/ui/card';
import useLogic from './logic';

const Build = () => {
  const l = useLogic();

  return (
    <div onKeyDown={l.handleKeyDown} className='py-4 w-full'>
      <Container className='space-y-4'>
        <Card>
          <Heading data={l.data} l={l} />
          <CardContent>
            <GridContainer>
              <Group.Contact data={l.data} l={l} />
              <Group.MyProfile data={l.data} l={l} />
              <Group.Skills data={l.data} l={l} />
              <Group.Experience data={l.data} l={l} />
              <Group.Languages data={l.data} l={l} />
            </GridContainer>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Build;
