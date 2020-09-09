import React from 'react';


const Users = props=>{


    return (
        <div >
            {
                props.users.map(user=>(
                    
                    
                    <div>

                        <h3>Name: { user.name}</h3>
                        <p>Email:{ user.email}</p>
                        <p>Password:{ user.password}</p>
                        <p>Terms:{ user.terms}</p>
                        <p>Role:{ user.role}</p>
                    </div>
                    ))
            }
            
        </div>
    )
}
export default Users