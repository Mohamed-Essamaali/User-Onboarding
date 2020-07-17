import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import Input from './Input';
import axios from 'axios';
import './Form.css';



const DataForm = (props)=>{
    const[users,setUsers] = useState([]); 


    const defaultState = {
        name:'',
        email:'',
        password:'',
        terms: false
     }

    const[formState, setFormState]= useState(defaultState);
    const[errors,setErrors]= useState({...defaultState})
    const[buttonDisabled,setButtonDisabled] = useState(true);

    const inputChange=e=>{
        e.persist();
        validateChange(e);
        let value =e.target.type==='checkbox' ? e.target.checked : e.target.value
        console.log(formState)
        console.log(errors)
        setFormState({...formState,
            [e.target.name]:value})
            
           
    }
    // create schema form for validation
    const formSchema = yup.object().shape({
        name: yup.string().required('please enter a name'),
        email:yup.string().email('enter a valide email').required('please enter an email'),
        password: yup.string().required('please enter a password'),
        terms: yup.boolean().oneOf([true], "please agree to terms of use"),

    })
    useEffect(()=>{
        formSchema.isValid(formState).then(valid=>setButtonDisabled(!valid))
    },[formState])

// validate changes 
const validateChange = e =>{
    let value =e.target.type==='checkbox' ? e.target.checked : e.target.value
    yup
        .reach(formSchema,e.target.name)
        .validate(value)
        .then(valid =>{
            setErrors({...errors,
                [e.target.name]:''})
        })
        .catch(err=>{
            setErrors({
                ...errors,[e.target.name]:err.errors[0]
            })
        })
}
//submit form button
const submitForm= e =>{
    e.preventDefault();
    console.log('form Submitted');
    axios
    .post("https://reqres.in/api/users", formState)
    .then(res=>{
        console.log('success', users)
        setUsers([...users,res.data])
        
       //reset form
        setFormState({
            name:'',
            email:'',
            password:'',
            terms: false

        })})
        .catch(err=>{
           
            console.log( 'something wrong',err)
        })
    }


return(
    <div className= "user-form">
        <form onSubmit={submitForm}>
         <Input
            type='text'
            name='name'
            onChange={inputChange}
            value={formState.name}
            label='Name'
            errors={errors}
         />
         <Input
            type='text'
            name='email'
            onChange={inputChange}
            value={formState.email}
            label='Email'
            errors={errors}
         />
         <Input
            type='password'
            name='password'
            onChange={inputChange}
            value={formState.password}
            label='Password'
            errors={errors}
         />
         <Input
            type='checkbox'
            name='terms'
           
            onChange={inputChange}
            checked={formState.terms}
            label='Terms'
            errors={errors}
         />
         <button disabled ={buttonDisabled} type='submit'>Submit</button>
            
        </form>
        { /* displaying our post request data */  }

        <pre>
           {JSON.stringify(users, null, 2)}
            
            </pre>

    </div>

)

}

export default DataForm