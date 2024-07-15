'use client';

import { Heading } from '@/components/build';
import * as Group from '@/components/build/group';
import { Container, GridContainer } from '@/components/template';
import { Card, CardContent } from '@/components/ui/card';
import useLogic from './logic';

const Build = () => {
  const l = useLogic();
  const { data } = l;

  return (
    <div onKeyDown={l.handleKeyDown} className='md:pt-4 w-full'>
      <Container className='space-y-4'>
        <Card>
          <Heading data={data} l={l} />
          <CardContent>
            <GridContainer>
              <Group.Contact data={data} l={l} />
              <Group.MyProfile data={data} l={l} />
              <Group.Skills data={data} l={l} />
              <Group.Experience data={data} l={l} />
              <Group.Languages data={data} l={l} />
            </GridContainer>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Build;
