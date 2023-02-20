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
      <CheckboxGroup colorScheme="orange">
          {month &&
            month.map((item) => (
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox value={item} onChange={onChange}></Checkbox>
                <p class="m-0">{item}</p>
              </Stack>
            ))}
        </CheckboxGroup>
    </div>
  );
};

export default FilterMonth;
