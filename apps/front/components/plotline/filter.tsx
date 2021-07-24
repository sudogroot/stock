import { Select, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';
import  moment from 'moment';
const { RangePicker } = DatePicker;


export function Filters() {
  const [data, setData] = useState<any>({
    names : [],

  }) // todo fix typing
   // todo .env
  useEffect(()=>{
    const getData = async ()=> {
      const res = await fetch(`http://localhost:3333/api/linefilters`)
      const data =  await res.json()
      setData(data)
    }
    getData()
  },[])
  console.log(data)
  const { Option } = Select;

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
console.log('aaaa',data.data)
  return (
    <Header>
      {!!data?.minDate?.value_as_string
       &&
       <RangePicker
       disabledDate={d => !d ||  d.isBefore(data?.minDate?.value_as_string) || d.isAfter(data?.maxDate?.value_as_string) }
       defaultValue={[moment(data?.minDate?.value_as_string), moment(data?.minDate?.value_as_string)]}
       defaultPickerValue={[moment(data?.minDate?.value_as_string), moment(data?.minDate?.value_as_string)]}
       />
       }

      <Select
        mode="multiple"
        placeholder="Please select"
        onChange={handleChange}
        style={{ width: '100%' }}
        >
        {data?.names.map(name =>
        <Option key={name} value={name}>{name}</Option>)}
      </Select>
    </Header>
    );
}



const Header = tw.div` flex p-4 w-full border-b border-gray-200`
