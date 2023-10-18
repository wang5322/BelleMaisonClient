import React, { useState } from 'react';

const Sorting = ( {handleSorting} ) => {
    const [sorting, setSorting] = useState('newest');

    const doSorting = (event) => {
        const selectedValue = event.target.value;
        setSorting(selectedValue);
        handleSorting(selectedValue);
    };
    return (
        <div>
            <label style={{marginRight:15}}>Sort By:</label>
            <select value={sorting} onChange={doSorting}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priceAsc">Price low to high</option>
                <option value="priceDesc">Price high to low</option>
            </select>
        </div>
    )
};
export default Sorting;

