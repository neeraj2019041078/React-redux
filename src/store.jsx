import {createStore,applyMiddleware} from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import {thunk} from "redux-thunk";

const Add_task="task/add";
const Delete_task="task/delete";
const Fetch_task="task/fetch"
const initialState={
    task:[],
    isLoading:false,
}

const taskReducer=(state=initialState,action)=>{
    switch(action.type){
        case Add_task:
            return{
                ...state,
                task:[...state.task,action.payload]
            };

        case Delete_task:
            return{
                ...state,
                task:state.task.filter((_,index)=>index!==action.payload)
            };
        case Fetch_task:
            return{
                ...state,
                task:[...state.task,...action.payload]
            }

        default:
            return state
    }
}


export  const store=createStore(taskReducer,composeWithDevTools(applyMiddleware(thunk)));
console.log(store)


// console.log("initialState",store.getState());

// store.dispatch({type:Add_task,payload:"Learn redux"});
// store.dispatch({type:Add_task,payload:"Learn redux 4"});
// store.dispatch({type:Delete_task,payload:1});



//action creator

// store.dispatch({type:Add_task,payload:"Hello Neeraj"})



const addTask=(data)=>{
    return {type:Add_task,payload:data}
}
// store.dispatch(addTask("Hello Neeraj"))
// console.log("initial STate",store.getState())
export const fetchTask=()=>{
    return async (dispatch)=>{
        try{
            const res=await fetch("https://fakestoreapi.com/products");
            const task=await res.json();
            // console.log("hello",task);
            const titles=task.map((item)=>item.title)
            dispatch({type:Fetch_task,payload:titles})
        }
        catch(err){
            console.log(err)

        }

    }
}