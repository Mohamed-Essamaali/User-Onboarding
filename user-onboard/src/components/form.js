import React,{useState,useEffect} from 'react';
import * as yup from 'yup';

const Form = props=>{
    const[formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        terms:false
    })

    const [buttonDisabled,setButtonDisabled] = useState(true)

    const handleChange = event=>{
    //     e.persist allows us to use the synthetic event in an async manner (inside of validateChange fn).
    // We need to be able to use it after the form validation 
        event.persist();
        let newData = event.target.type ==='checkbox'? event.target.checked : event.target.value;
       
        validate(event)
        setFormData({...formData,[event.target.name]:newData})

        console.log(formData)
       

    }
    const formSchema = yup.object().shape({
        name:yup.string().required('Name is a required field').min(4,'Minimum four characters'),
        email: yup.string().email('Must enter a valid email').required('Must include email address'),
        password: yup.string().required('must provide a password').min(6,'password minimum 6 charaters'),
        terms: yup.boolean().oneOf([true]).required('Please agree to terms of use')
    })

    const[errors,setErrors] = useState({
        name:'',
        email:'',
        password:'',
        terms:false
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
        .validate(event.target.name ==='checkbox'?event.target.checked:event.target.value)
        .then(valid=>{
            setErrors({
                ...errors,[event.target.name]:''
            })
        }
           )
        .catch(err=>{
            setErrors({
                ...errors,[event.target.name]:err.errors[0]
            })
        })
    }


    const submitForm= event=>{
        event.preventDefault();

    }


    return(
        <div className='form'>
            <form onSubmit={submitForm}>
                <label htmlFor='name'>Name</label>
                <input id='name' type='string' name='name' value={formData.name} onChange={handleChange}/>
                {errors.name.length>0?<p className='error'>{errors.name}</p>:null}
                <label htmlFor='email'>Email</label>
                <input id='email' type='email' name='email' value={formData.email} onChange={handleChange}/>
                {errors.email.length>0?<p className='error'>{errors.email}</p>:null}
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' name='password' value={formData.password} onChange={handleChange}/>
                {errors.password.length>0?<p className='error'>{errors.password}</p>:null}
                <label htmlFor = 'terms'>Agree the terms</label>
                <input type='checkbox' id='terms' name='terms' checked={formData.terms} onChange={handleChange}/>
                {errors.terms.length>0? <p className='error'>{errors.terms}</p> :null }
                <button disabled = {buttonDisabled} type='submit'>Submit!</button>
            </form>

        </div>
    )
}
export default Form