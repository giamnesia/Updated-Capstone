import barangays from "../../../data/barangay";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

const FilterGender = ({ gender, filterGender, setFilterGender }) => {
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...filterGender, input.value];
      setFilterGender(state);
    } else {
      const state = filterGender.filter((val) => val !== input.value);
      setFilterGender(state);
    }
  };

  return (
    <div class="ml-20">
      <h1>Filter By Gender</h1>
	  <br/>
      <div>
        <CheckboxGroup colorScheme="green">
          {gender &&
            gender.map((item) => (
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox value={item} onChange={onChange}></Checkbox>
                <p class="m-0">{item}</p>
              </Stack>
            ))}
        </CheckboxGroup>
      </div>
    </div>
  );
};

export default FilterGender;
