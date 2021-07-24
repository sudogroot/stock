import styled from 'styled-components';
import dynamic from 'next/dynamic'
const StyledPage = styled.div`
  .page {
  }
`;

const DynamicPlot = dynamic(import('../components/Plot').then(module =>  module.PlotTest), {
  ssr: false
})

export function Index() {

  return (
    <StyledPage>
      <DynamicPlot/>
    </StyledPage>
  );
}

export default Index;
