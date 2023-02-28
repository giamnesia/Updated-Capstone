import { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

const Filter = ({ address, filterAddress, setFilterAddress }) => {
  const [checked, setChecked] = useState(true);
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...filterAddress, input.value];
      setFilterAddress(state);
    } else {
      const state = filterAddress.filter((val) => val !== input.value);
      setFilterAddress(state);
    }
  };

  return (
    <div class="flex-start">
      <h1>Filter By Address</h1>
      <br/>

        {address &&
          address.map((item) => (
            <CheckboxGroup colorScheme="orange">
              <div>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox value={item} onChange={onChange}></Checkbox>
                <p class="m-0">{item}</p>
              </Stack>
              </div>
            </CheckboxGroup>
          ))}
      
    </div>
  );
};

export default Filter;
