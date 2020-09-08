import React,{useState} from 'react';

const Form = props=>{
    const[formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        terms:false
    })
    const handleChange = event=>{
        setFormData({...formData,[event.target.name]:event.target.value})

    }
    const submitForm= event=>{
        event.preventDefault();

    }


    return(
        <div className='form'>
            <form onSubmit={submitForm}>
                <label htmlFor='name'>Name</label>
                <input id='name' name='name' value={formData.name} onChange={handleChange}/>
                <label htmlFor='email'>Email</label>
                <input id='email' name='email' value={formData.email} onChange={handleChange}/>
                <label htmlFor='password'>Password</label>
                <input id='password' name='password' value={formData.password} onChange={handleChange}/>
                <button type='submit'>Submit!</button>
            </form>

        </div>
    )
}
export default Form