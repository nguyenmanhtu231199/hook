import React, { useEffect, useState } from 'react';
import './style.scss';
import useClock from '../../hooks/useClock';

Clock2.propTypes = {};


function Clock2() {
    const {timeString}= useClock();
    return (
       <div className="Clock2">
           <div className="Clock2__time">{timeString}</div>
       </div>
    );
}

export default Clock2;