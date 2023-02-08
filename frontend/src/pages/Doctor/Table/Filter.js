import barangays from "../../../data/barangay";
import { useEffect, useState } from "react";

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
      <div class="flex flex-row flex-wrap">
        {address &&
          address.map((item) => (
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
    </div>
  );
};

export default Filter;
