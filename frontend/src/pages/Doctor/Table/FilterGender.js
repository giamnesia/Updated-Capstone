import barangays from "../../../data/barangay";
import { useEffect ,useState} from "react";
const FilterGender = ({gender, filterGender, setFilterGender }) => {

	const onChange = ({ currentTarget: input}) => {
        
		if (input.checked) {
            
			const state = [...filterGender, input.value];
			setFilterGender(state);
		} else {
            
			const state = filterGender.filter((val) => val !== input.value);
			setFilterGender(state);


        }
		
	};

	return (
		<div class='ml-20'>
			<h1 >Filter By Gender</h1>
			<div >
				{gender &&gender.map((item) => (
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

export default FilterGender;