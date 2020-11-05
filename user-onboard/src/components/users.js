import React from 'react';


const Users = props=>{


    return (
        <div className='users'>
            {
                props.users.map(user=>(
                       
                    
                    <div key={user.id}>
                        {console.log('user in users ',user)}
                        <h3>Name: { user.name}</h3>
                        <p>Email:{ user.email}</p>
                        <p>Role:{ user.role}</p>
                    </div>
                    ))
            }
            
        </div>
    )
}
export default Users