import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask } from "./store";

// const App = () => {
//   const [input,setInput]=useState("");
//   const [data,setData]=useState([]);

//   const state=useSelector((state)=>state)
//   console.log(state);

//   const handleClick=(e)=>{
//     e.preventDefault();
//     setData([...data,input])
//     setInput("");
//     console.log(data)

//   }
//   const handleDel=(index)=>{
//     // e.preventDefault();
//     const updatedData=data.filter((_,i)=>i!==index);
//     setData(updatedData)
//   }
//   return (
//     <>
//     <form>
//       <input type='text' value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Enter an Input'  />
//       <button onClick={handleClick}>Add</button>
//     </form>
//     <ul>
//     {data.map((dats,index)=>(

//       <li  key={index}>{dats}
//       <button onClick={()=>handleDel(index)}>Del</button>
//       </li>

//   ))}
//     </ul>

//     </>
//   )
// }

// export default App
const Add_task="task/add"
const Delete_task="task/delete"

const App = () => {
  const [input, setInput] = useState("");
  const dispatch=useDispatch()
  const tasks=useSelector((state)=>state.task);
  const handleClick=(e)=>{
    e.preventDefault();
    if (input.trim() === "") return;
    dispatch({type:Add_task,payload:input});
    setInput("");
  }
  const handleDel=(index)=>{
    dispatch({type:Delete_task,payload:index});

  }

  const handleFetchTask=()=>{
    dispatch(fetchTask())
  }

  return (
    <>
      <form>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter an Value"
        />
        <button  onClick={handleClick}>Add Task</button>
      </form>
      <div>
        <button onClick={handleFetchTask}>Fetch Task</button>
      </div>
      <ul>
        {tasks.map((task,index)=>(
          <li key={index}>
          {index}: {task}
          <button onClick={()=>handleDel(index)}>Del</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;