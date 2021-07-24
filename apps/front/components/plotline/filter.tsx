import { Select, DatePicker } from 'antd';
import tw from 'twin.macro';
const { RangePicker } = DatePicker;


export function Filters() {

  const { Option } = Select;

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  return (
    <Header>
    <RangePicker />

    <Select
        mode="multiple"

        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        <Option key="val1" value="val1">Val1</Option>
        <Option key="val1" value="val2">Val2</Option>
      </Select>
    </Header>
    );
}



const Header = tw.div` flex p-4 w-full border-b border-gray-200`
