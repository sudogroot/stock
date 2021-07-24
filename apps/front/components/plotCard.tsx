import tw from 'twin.macro';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function PlotCard(props: Props) {
  return (
    <MainContainer>
      <Content>{props.children}</Content>
    </MainContainer>
  );
}

const MainContainer = tw.div`
 flex flex-col
  w-full
  h-full
  shadow-sm
  justify-center items-center
`;

const Content = tw.div`
 flex w-full h-full bg-white
 justify-center items-center
`;
