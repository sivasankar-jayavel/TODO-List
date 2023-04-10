import React, { useState } from 'react';
import axios from "axios";

function Creater() {

  const [description,setDescription] = useState('');
  const [job,setJob] = useState('');
  const [completed,setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Submitted');


    const newTodo = {
      todo_description : description,
      todo_job : job,
      todo_completed : completed
    }

    axios.post('http://localhost:4000/todos/add',newTodo).then(res=>console.log(res.data));

    setDescription('')
    setJob('');
    setCompleted(false);
  }

  const handleSetDescription =(e)=>{
    setDescription(e.target.value);
  }

  const handleSetJob =(e)=>{
    setJob(e.target.value);
  }
  

  return (
    <div>
    <h3 align="center">Create TODO-List</h3>
      <form onSubmit={handleSubmit} >

        <div>
          <label>Job : </label>
          <input type='text' value={job} onChange={handleSetJob} className='form-control'/>
        </div>

         <br/>

        <div className='form-group'>
          <label>Description : </label>
          <input type='text' value={description} onChange={handleSetDescription} className='form-control'/>
        </div>

   <br/>

        <div className='form-group'>
          <input type='submit' value='Create Item' className='btn btn-primary' />
        </div>
      </form>
    </div>
  )
}

export default Creater