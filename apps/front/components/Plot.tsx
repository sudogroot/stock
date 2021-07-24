import styled from 'styled-components';
import dynamic from 'next/dynamic'
import plotly from 'plotly.js/dist/plotly';
import createPlotComponent from 'react-plotly.js/factory';
import { useState } from 'react';

const StyledPage = styled.div`
  .page {
  }
`;

const Plot = createPlotComponent(plotly);

export function PlotTest() {

  const  [data,setData]=  useState(
    {
      x: [1, 2, 3],
      y: [2, 6, 3],
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: 'red'},
    }
  )
  return (
    <StyledPage>
      <Plot
        data={[
          {...data}
          // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }

      />
      <button onClick={()=>{
        setData({
          x: [4, 6, 8],
          y: [5, 7, 9],
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'red'},
        })
      }}>click me</button>
    </StyledPage>
  );
}

