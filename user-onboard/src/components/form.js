import React,{useState,useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import {FormGroup,Label,Input,Col,Row} from 'reactstrap';
import Users from './users'

const Form = props=>{
    const[formData,setFormData] = useState({
      
        name:'',
        email:'',
        password:'',
        terms:false,
        role:''
    })

    const [buttonDisabled,setButtonDisabled] = useState(true)

    const[users,setUsers]=useState([])

    const handleChange = event=>{
    //     e.persist allows us to use the synthetic event in an async manner (inside of validateChange fn).
    // We need to be able to use it after the form validation 
        event.persist();
        let newData = event.target.type ==='checkbox'? event.target.checked : event.target.value
       
        validate(event)
        setFormData({...formData,[event.target.name]:newData})


    }
    const formSchema = yup.object().shape({
        name:yup.string().required('Name is a required field').min(4,'Minimum four characters'),
        email: yup.string().email('Must enter a valid email').required('Must include email address'),
        password: yup.string().required('must provide a password').min(6,'password minimum 6 charaters'),
        terms: yup.boolean().oneOf([true],'Please agree to terms of use'),
        role: yup.string()
    })

    const[errors,setErrors] = useState({
        name:'',
        email:'',
        password:'',
        terms:'',
        role:''

    })

    useEffect(()=>{
        formSchema
        .isValid(formData)
        .then(valid=>{setButtonDisabled(!valid)

                    })
    },[formData])

    //validate inputs
    const validate = event=>{

        yup
        .reach(formSchema,event.target.name)
        .validate(event.target.type ==='checkbox'?event.target.checked:event.target.value)
        .then(valid=>{
            setErrors(
                {...errors,[event.target.name]:''
            })
        }
           )
        .catch(err=>{
            setErrors(
                {...errors,[event.target.name]:err.errors[0]
            })
        })
    }
    const reset = ()=>{
        setFormData({ name:'',
        email:'',
        password:'',
        terms:false,
    role:''})
      
    }

    const submitForm= event=>{
        event.preventDefault();
        reset()
        axios
        .post('https://reqres.in/api/users',formData)
        .then(res=>{
            setUsers([...users,res.data])
            console.log('form submitted',users)
        })

    }


    return(
        <div className='form'>
            <form onSubmit={submitForm} >
               
            <div>
                    <label  htmlFor='name'>Name</label>
                    <input data-cy = 'name' id='name' type='string' name='name' value={formData.name} onChange={handleChange}/>
                    {errors.name.length>0?<p className='error'>{errors.name}</p>:null}
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input data-cy='email' id='email' type='email' name='email' value={formData.email} onChange={handleChange}/>
                    {errors.email.length>0?<p data-cy='email-error' className='error'>{errors.email}</p>:null}
                    </div>
                    <div>
                    <label htmlFor='password'>Password</label>
                    <input data-cy='password' id='password' type='password' name='password' value={formData.password} onChange={handleChange}/>
                    {errors.password.length>0?<p className='error'>{errors.password}</p>:null}
                    </div>
                    <div className='terms-container'>
                       
                            <label htmlFor = 'terms'>Agree the terms</label>
                            <input data-cy='terms' type='checkbox' id='terms' name='terms' value={formData.terms?'agreed':'disagree'} checked={formData.terms} onChange={handleChange}/>
                        
                     
                        {<p className='error'>{errors.terms}</p> }
                    </div>
                  
                    <div>
                    <label htmlFor='role'>Role</label>
                    <select data-cy='role' id='role' name='role' onChange={handleChange}>
                        <option value='frontEnd'>Front End Engineer </option>
                        <option value='backEnd'>Back End Engineer </option>
                        <option value='designer'>Designer </option>
                    </select>
                    </div>


                    <button data-cy='submit' disabled = {buttonDisabled} type='submit'>Submit!</button>
            </form>
           
                <Users users={users}/>
           
            

        </div>
    )
}
export default Form