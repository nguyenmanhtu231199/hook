import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onsubmit : PropTypes.func,
};
TodoForm.defaultProps ={
    onsubmit : null,
    
};

function TodoForm(props) {
    const {onsubmit} =props;
    const [value, setValue]= useState('');
    function handleValueChange (e){
        setValue(e.target.value);
        }
    function handleSubmit (e) {
        e.preventDefault();
        if(!onsubmit) return;
        const formValues ={
            title : value,
        };
        onsubmit(formValues);
        setValue('');
    }
    return (
        <form onSubmit={handleSubmit}>
<input type="text" 
value={value}
onChange={handleValueChange}
/>
        </form>
    );
}

export default TodoForm;