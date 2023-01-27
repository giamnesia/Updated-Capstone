import barangays from "../../../data/barangay";
import { useEffect ,useState} from "react";
const Filter = ({address, filterAddress, setFilterAddress }) => {

	const onChange = ({ currentTarget: input}) => {
        
		if (input.checked) {
            
			const state = [...filterAddress, input.value];
			setFilterAddress(state);
		} else {
            
			const state = filterAddress.filter((val) => val !== input.value);
			setFilterAddress(state);


        }
		
	};

	return (
		<div >
			<h1 >Filter By Address</h1>
			<div >
				{address.map((item) => (
					<div >
						<input
					
							type="checkbox"
							value={item}
							onChange={onChange}
						/>
						<p >{item}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Filter;