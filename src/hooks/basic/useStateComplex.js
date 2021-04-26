import { useState } from 'react';


const useStateComplex = initialState => {

    const [state, setState] = useState(initialState);

    return [
        state,
        value => {
            setState(prevState => ({
                ...prevState,
                ...value
            }));
        }
    ];
};

export default useStateComplex;