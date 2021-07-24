import tw from 'twin.macro'
import { PageHeader } from 'antd';
import {ReactNode} from 'react'

interface  Props {
  children: ReactNode
}

export function Layout( props : Props) {


  return (
    <MainContainer>
    <StyledHeader
    title="Stock Demo"
  />
    <Content>
      {props.children}
    </Content>
    </MainContainer>
  );
}

const MainContainer = tw.div`
 flex flex-col w-screen h-screen
`;
const StyledHeader = tw(PageHeader)`w-screen shadow-sm`
const Content = tw.div`
 flex w-screen h-screen bg-gray-100 pt-4
`;
