
import { useEffect ,useState} from "react";

const FilterServices = ({services, filterServices, setFilterServices }) => {

	const [checked, setChecked] = useState(true);
	const onChange = ({ currentTarget: input}) => {
        
		if (input.checked) {
            
			const state = [...filterServices, input.value];
			setFilterServices(state);
			
		} else {
            
			const state = filterServices.filter((val) => val !== input.value);
			setFilterServices(state);


        }
		
	};

	return (
		<div class='flex-start ml-20' >
			<h1 >Filter By Services</h1>
			<div  class='flex flex-row flex-wrap'>
				{services&& services.map((item) => (
					<div class=' ' >
						<input
					       class='w-96 flex items-center'
							type="checkbox"
							value={item}
							onChange={onChange}
						/>
						<p class='m-0'>{item}</p>
					
						
					</div>
				))}
			</div>
		

	

  
		</div>
	);
};

export default FilterServices;