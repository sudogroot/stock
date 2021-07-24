import dynamic from 'next/dynamic';
import tw from 'twin.macro';

const DynamicLinePlot = dynamic(
  import('../components/plotline/plotLine').then((module) => module.PlotTest),
  {
    ssr: false,
  }
);

export function Index() {
  return (
    <StyledPage>
      <LinePlotContainer>
        <DynamicLinePlot />
      </LinePlotContainer>
    </StyledPage>
  );
}

const StyledPage = tw.div`
 w-full h-full
`;

const LinePlotContainer = tw.div`
flex flex-row justify-center items-center
w-full px-20
`;

export default Index;
