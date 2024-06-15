import { useReducer } from "react";
import { initialstate, reducer } from "./state/formReducer";
import { actionType } from "./state/actionType";

const Form = () => {
    
    const [state, dispatch] = useReducer(reducer, initialstate)
   
    const HandleSubmit = (e)=>{
        e.preventDefault()
        console.log(state);
    }
    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <label>First Name</label> <br />
                <input type="text" name="firstName" 
                onClick={(e)=>{dispatch({
                    type: actionType.INPUT,
                    payload:{name:e.target.name, value:e.target.value},
                })}}
                /><br />
                <label>Last Name</label><br />
                <input type="text" name="lastName"
                onClick={(e)=>{dispatch({
                    type: actionType.INPUT,
                    payload:{name:e.target.name, value:e.target.value},
                })}}
                /><br />
                <label>Phone</label><br />
                <input type="text" name="phone"
                onClick={(e)=>{dispatch({
                    type: actionType.INPUT,
                    payload:{name:e.target.name, value:e.target.value},
                })}}/><br />
                <label>Email</label><br />
                <input type="text" name="email"
                onClick={(e)=>{dispatch({
                    type: actionType.INPUT,
                    payload:{name:e.target.name, value:e.target.value},
                })}}/><br />
                <input type="checkbox" name="terms" id="term" onClick={()=>{dispatch({
                    type: actionType.TOGGLE,
                })}}/>
                <label>Agree with the terms</label><br />
                <button type="submit" disabled={!state.term}>Submit</button>
            </form>
            
        </div>
    );
};

export default Form;