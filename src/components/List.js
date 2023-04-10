import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link } from 'react-router-dom'
import '../App.css'
import {BiEdit} from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import {IoAddCircleOutline} from "react-icons/io5";


function List() {

  
  const Todo = props =>{

    const {todo_completed} = props.todo;

    const handleDelete = () => {
      console.log(props.todo._id);
      
      axios.delete(`http://localhost:4000/todos/delete/${props.todo._id}`).then(response=>{
        console.log('Item Deleted');
        axios.get('http://localhost:4000/todos/').then(response => {
          setTodoItems(response.data)
        })
        .catch(function(err){
          console.log(err);
        })
      })
    }

     return( 
     <tr style={{backgroundColor:"#ESFDD1"}}>

      <td className={todo_completed ? "completed" : ""}>{props.todo.todo_description}</td>
      <td className={todo_completed ? "completed" : ""}>{props.todo.todo_job}</td>
      <td>
        <Link to={'/update/'+props.todo._id}><BiEdit size={28} style={{color:"#FFA1A1"}}/></Link>
        <MdDelete size={28} onClick={handleDelete} style={{color:"#ee0202"}} />
        {/* <input type='submit' onClick={handleDelete} value={MdDelete} className='btn btn-danger' /> */}
      </td>
    </tr>
    );
  }
  
  const [todoItems,setTodoItems] = useState([]);

 useEffect(()=>{
     axios.get('http://localhost:4000/todos/').then(response => {
      setTodoItems(response.data)
     }).catch((err) => {
        console.log(err);
     })
 },[])

 useEffect(()=>{
     console.log(todoItems)
 },[todoItems])

  function todoList(){
      return todoItems.map(function(currentTodo,i){
        return <Todo todo={currentTodo} key={i} />
      })
   }

  return (
    <div>
    <Link to='/' className='navbar-brand' ><h2 >TODO-LISTS</h2></Link>
    <table id='todo_items' className='table table-striped' style={{marginTop:20}}>
      <thead style={{backgroundColor : '#FFA1A1'}}>
        <tr>
          <th>Description</th>
          <th>Job</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          todoItems.length > 0 ? todoList() : <p>Add Items...!</p>
          }
      </tbody>
    </table>
    <Link to={'/create'}><IoAddCircleOutline size={40} style={{color:'#FFA1A1'}} /></Link>
   </div>
  )
}

export default List;