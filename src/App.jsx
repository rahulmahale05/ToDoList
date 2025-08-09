import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid');
import "./App.css";

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todostring = JSON.parse(localStorage.getItem("Todos"))
    if(todostring){
        let Todos = JSON.parse(localStorage.getItem("Todos"))
        setTodos(Todos)
    }
  }, [])

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }
  
  

  const saveToLS = () => {
    localStorage.setItem("Todos",JSON.stringify(Todos))
  }
  

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleEdit = (e,id)=>{
    let todo = Todos.filter(item=>item.id===id)
    setTodo(todo[0].Todo)
    let newTodos = Todos.filter((item)=>{
      return item.id!=id;
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e,id)=>{
    let newTodos = Todos.filter((item)=>{
      return item.id!=id;
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = ()=>{
    setTodos([...Todos , {id:uuidv4(), Todo,isComplete:false}])
    setTodo("")
    saveToLS()

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex((item) => {
      return item.id===id;
    })
  let newTodos= [...Todos];
  newTodos[index].isComplete=!newTodos[index].isComplete;
  setTodos(newTodos)
  saveToLS()
  }
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-cyan-400 rounded-lg min-h-[70vh] w-1/2">
        <div className="rounded-lg p-2 pl-2 mt-10">
          <div className="addTodo">
            <h2 className="text-lg font-bold text-center mt-2 ">Add a Todo</h2>
            <input type="text" onChange={handleChange} value={Todo} className="ml-[10%] rounded-full mx-auto mt-4 p-1 w-[70%]" />
            <button onClick={handleAdd} disabled={Todo.length<=2} className="mt-4 ml-5 cursor-pointer disabled:bg-blue-400 bg-blue-500 hover:bg-blue-600 py-1 px-3 text-red-600 hover:text-red-700 rounded-full font-bold">save</button>
          </div>
            <input type="checkbox" className="mt-14 ml-[10%]" onChange={toggleFinished} checked={showFinished}/> 
            <label htmlFor="show">Show Finished</label>
            <div className="h-[1px] bg-black opacity-15 w-[70%] mx-auto my-2"></div>
          <h1 className="font-bold text-lg mt-2 mx-auto w-[80%]">Your Todos</h1>
          <div className="todos mx-auto w-[80%]">
            {Todos.length === 0 && <div className="m-3">No Todos to Display</div>}
            {
              Todos.map((item)=>{
                return( (showFinished || !item.isComplete) &&
                  <div className="todo flex mx-auto my-3 justify-between" key={item.id}>
                    <div className="flex gap-6 ml-2">
                      <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isComplete} id="" />
                      <div className={item.isComplete ? "line-through":""}>{item.Todo}</div>
                    </div>
                  <div className="button flex h-full">
                    <button onClick={(e)=>{handleEdit(e,item.id)}} className="ml-3 bg-blue-500 hover:bg-blue-600 py-1 px-3 text-red-600 hover:text-red-700 rounded-lg font-bold"><FaEdit /></button>
                    <button onClick={(e)=>{handleDelete(e,item.id)}} className="ml-5 bg-blue-500 hover:bg-blue-600 py-1 px-3 text-red-600 hover:text-red-700 rounded-lg font-bold"><MdDelete /></button>
                  </div>
                </div>)
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
