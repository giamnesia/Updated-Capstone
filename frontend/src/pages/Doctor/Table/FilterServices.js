import { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
const FilterServices = ({ services, filterServices, setFilterServices }) => {
  const [checked, setChecked] = useState(true);
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...filterServices, input.value];
      setFilterServices(state);
    } else {
      const state = filterServices.filter((val) => val !== input.value);
      setFilterServices(state);
    }
  };

  return (
    <div class="flex-start ml-20">
      <h1>Filter By Services</h1>
	  <br/>

      <div class="flex flex-col flex-wrap"></div>
      <CheckboxGroup colorScheme="green">
        {services &&
          services.map((item) => (
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Checkbox value={item} onChange={onChange}></Checkbox>
              <p class="m-0">{item}</p>
            </Stack>
          ))}
      </CheckboxGroup>
    </div>
  );
};

export default FilterServices;
