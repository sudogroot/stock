import styled from 'styled-components';
import plotly from 'plotly.js/dist/plotly';
import createPlotComponent from 'react-plotly.js/factory';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PlotCard } from '../plotCard';
import { Filters } from './filter';
import tw from 'twin.macro';

const Plot = createPlotComponent(plotly);

export function PlotTest() {
  const [filterData, setFilterData] =
    useState<{
      range: [string, string];
      stockNames: string[];
      market: string;
    }>();
  const [data, setData] = useState<any>(); // todoType

  const updateFilterData = useCallback(
    (range: [string, string], stockNames: string[], market: string) =>
      setFilterData((data) => ({
        range: range || data.range,
        stockNames: stockNames || data.stockNames,
        market: market || data.market,
      })),
    []
  );

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  const dataChart = useMemo(() => {
    const dataKeys = Object.keys(data?.data || {});
    const dataChart = [];
    if (!!dataKeys.length && !!data) {
      dataKeys.forEach((key) => {
        const x = [];
        const y = [];
        console.log('2ssss', data?.data[key], key, data);
        console.log('3ssss', key);
        console.log('4ssss', data);
        data?.data?.[key].forEach((record) => {
          x.push(record._source.date);
          y.push(record._source.low_price);
        });
        dataChart.push({
          x,
          y,
          type: 'scatter',
          mode: 'lines+markers',
          title: 'a',
        });
      });
    }

    return dataChart;
  }, [data]);
  useEffect(() => {
    const getData = async () => {
      // todo create a service file
      const res = await fetch(`http://localhost:3333/api/stock-data`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(filterData),
      });
      const data = await res.json();
      setData(data);
    };
    getData();
  }, [filterData]);
  console.log('11111', filterData);
  return (
    <PlotCard>
      <Content>
        <Filters updateFilterData={updateFilterData}></Filters>
        <PlotContainer>
          <Plot
            data={dataChart}
            layout={{
              autosize: false,
              width: 750,
              height: 500,
              margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4,
              },
              paper_bgcolor: '#F3F4F6',
              title: 'A Fancy Plot',
            }}
            config={{ responsive: true }}
          />
        </PlotContainer>
        <ButtonContainer></ButtonContainer>
      </Content>
    </PlotCard>
  );
}

const Content = tw.div`
flex flex-col w-full h-full
justify-center items-center
pb-8
`;

const PlotContainer = styled.div`
  width: 770px;
  height: 520px;
  ${tw` bg-gray-100 text-center`}
`;

const ButtonContainer = styled.div``;
