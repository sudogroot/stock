import styled from 'styled-components';
import plotly from 'plotly.js/dist/plotly';
import createPlotComponent from 'react-plotly.js/factory';
import { useState } from 'react';
import { Select, Radio, Button, DatePicker } from 'antd';
import {PlotCard} from '../plotCard'
import {Filters} from './filter'
import tw from 'twin.macro';
const { RangePicker } = DatePicker;

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
  const { Option } = Select;

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  return (
    <PlotCard>
      <Content>
        <Filters></Filters>
      <Plot
        data={[
          {...data}
        ]}
        layout={ {width: '100%', height: '100%', title: 'A Fancy Plot'} }

      />


        <ButtonContainer>
        <Button onClick={()=>{
        setData({
          x: [4, 6, 8],
          y: [5, 7, 9],
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'red'},
        })
      }}>click me</Button>
        </ButtonContainer>
      </Content>


    </PlotCard>
    );
}

const Content = tw.div`
flex flex-col w-full
`;

const ButtonContainer = styled.div`
`;

