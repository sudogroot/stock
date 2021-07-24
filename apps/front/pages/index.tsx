import dynamic from 'next/dynamic'
import tw from 'twin.macro'

const StyledPage = tw.div`
bg-black
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
