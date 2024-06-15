import { useReducer } from "react";
import './Reducer.css'

const Reducer = () => {
    const initialState = 0
    const reducer = (state, action)=>{
        if(action.type === 'plus') {
            return state + action.playload
        }
        else if(action.type === 'minus') {
            return state - 1
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div className="container">
           <div><h1>{state}</h1></div>
           <div className="btn_container"> 
           <button className="btn" onClick={()=>dispatch({type: 'plus', playload:5})}>Plus</button>
            <button  className="btn" onClick={()=>dispatch({type: 'minus'})}>Minus</button>
            </div>
            
           
        </div>
    );
};

export default Reducer;