import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFilterForm.propTypes = {
    onSubmit:PropTypes.func,   
};
PostFilterForm.defaultProps = {
    onSubmit: null,
};
function PostFilterForm(props) {
    const {onSubmit}= props;
    const [searchTerm, setSearchTerm]= useState('');
    const tyingTimeOutRef = useRef(null)
     function handleSearchTermChange (e){
         const value = e.target.value
        setSearchTerm(value);
         if(!onSubmit) return;
         if(tyingTimeOutRef.current){
             clearTimeout(tyingTimeOutRef.current)
         };
         tyingTimeOutRef.current = setTimeout(()=>{
            const formValue ={
                searchTerm:value,
            };
            onSubmit(formValue);
         },100);
      }
    return (
       
       <from> 
           <input type="text" 
            value={searchTerm}
            onChange={handleSearchTermChange}
           />
           </from>
    );
}

export default PostFilterForm;