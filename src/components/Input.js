import React from 'react';

const Input = props=>{
    const errorMessage = props.errors[props.name]

    return (
        <>
        <label htmlFor='name'>
            {props.label}
            <input {...props}/>
        </label>
    {errorMessage.length === 0 ? null: 
    (<p className='error'>{errorMessage}</p>)}
        </>
    )
}
export default Input