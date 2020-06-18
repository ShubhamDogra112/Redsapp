import React from 'react';

import  './Spinner.css';

const spinner = () => (
    <div style={{width:"35rem",margin:"1.5rem"}}>

    <div className='Loader' style={{zIndex:'10'}}>Loading...</div>


    </div>
);

export default spinner;