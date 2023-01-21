import { useEffect, useState } from 'react';
import { parse, differenceInYears } from 'date-fns';

function Age({ birthdate }) {
    const [age, setAge] = useState(null);

    useEffect(() => {
        const birthdateDate = parse(birthdate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Date());
        const ageInYears = differenceInYears(new Date(), birthdateDate);
        setAge(ageInYears);
    }, [birthdate]);

    return <span>{age}</span>;
}

export default Age;
