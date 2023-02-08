import { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
const FilterMonth = ({ month, filterMonth, setFilterMonth }) => {
  const [checked, setChecked] = useState(true);
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...filterMonth, input.value];
      setFilterMonth(state);
    } else {
      const state = filterMonth.filter((val) => val !== input.value);
      setFilterMonth(state);
    }
  };

  return (
    <div class="flex-start ml-20">
      <h1>Filter By Month</h1>
	  <br/>

      <div class="flex flex-col flex-wrap"></div>
      {month &&
          month.map((item) => (
            <div>
              <input
                class="w-64 flex items-center m-0"
                type="checkbox"
                value={item}
                onChange={onChange}
              />
              <p class="m-0 ml-2">{item}</p>
            </div>
          ))}
    </div>
  );
};

export default FilterMonth;
