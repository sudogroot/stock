import { Select, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';
import moment from 'moment';
const { RangePicker } = DatePicker;

interface Props {
  updateFilterData: (
    range?: [string, string],
    name?: string[],
    market?: string
  ) => void;
}
export function Filters(props: Props) {
  const [data, setData] = useState<any>({
    names: [],
  }); // todo fix typing
  // todo .env
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:3333/api/linefilters`);
      const data = await res.json();
      setData(data);
      props.updateFilterData(
        [
          moment(data?.minDate?.value_as_string).format('YYYY-MM-DD'),
          moment(data?.maxDate?.value_as_string).format('YYYY-MM-DD'),
        ],
        [data?.names[0]],
        data?.market[1]
      );
    };
    getData();
  }, []);
  console.log(data);
  const { Option } = Select;

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  console.log('aaaa', data.data);
  return (
    <Header>
      {!data?.minDate?.value_as_string && <>loading...</>}
      {!!data?.minDate?.value_as_string && (
        <>
          <div>
            <>
              <p>Select range date:</p>
              <RangePicker
                allowClear={false}
                defaultValue={[
                  moment(data?.minDate?.value_as_string),
                  moment(data?.maxDate?.value_as_string),
                ]}
                onChange={(_, range) =>
                  props.updateFilterData(range, undefined)
                }
              />
            </>
          </div>

          <div>
            <p>Select Stock name :</p>

            <Select
              mode="multiple"
              placeholder="Please select"
              defaultValue={[data.names[0]]}
              onChange={(v) => props.updateFilterData(undefined, v as string[])}
              style={{ width: '100%' }}
            >
              {data?.names.map((name) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Market name :</p>

            <Select
              placeholder="Please select"
              defaultValue={data?.market[1]}
              onChange={(v) => props.updateFilterData(undefined, undefined, v)}
              style={{ width: '100%' }}
            >
              {data?.market.map((name) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </div>
        </>
      )}
    </Header>
  );
}

const Header = tw.div` flex flex-col p-4 w-full border-b border-gray-200`;
