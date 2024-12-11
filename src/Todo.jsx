import React,{useEffect, useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck ,faSquareCheck} from '@fortawesome/free-solid-svg-icons';

function Todo(){

    const [task,setTask] = useState(() => {
        const localValue = localStorage.getItem("ITEM")
        if(localValue == null) return []

        return JSON.parse(localValue)
    });

    useEffect(() => {
        localStorage.setItem("ITEM",JSON.stringify(task))
    },[task])

    function completestat(index){
        setTask((prevtask) =>
        prevtask.map((t,i) => 
        i === index ? {...t,completed: !t.completed} : t
        )
        );
    }

    function Addtask(){
        const newTask = document.getElementById("taskInput").value;
        if(newTask === ""){
            alert("Task cannot be empty,Please write something!");
            return;
        }
        const newTaskArr = {text:newTask,completed:false}
        document.getElementById("taskInput").value="";
        setTask(t => [...t,newTaskArr]);
    }

    function deleteTask(index){
        setTask(task.filter((_,t) => t != index));
    }
    return(
        <div>
            <h2><FontAwesomeIcon icon={faSquareCheck} style={{color: "#FFD43B"}} />  To Do List</h2>
            <input type="text" id="taskInput" placeholder="Write new Task" />
            <button onClick={Addtask}>Add Task</button>
            <ol>
                
                {task.length === 0 && "No Tasks"}
                {task.map((element, index) => <li key={index} 
                                            style={{textDecoration: element.completed ? "line-through" : "none",
                                                    color: element.completed ? "gray" : "white",
                                            }}><div className="task-container">

                                            <input type="checkbox" checked={element.completed}
                                                onChange={() => completestat(index)} />
                                                <div className="task-text" onClick={() => completestat(index)}>{element.text}</div> 
                                            <button className="btn" onClick={() => deleteTask(index)}><FontAwesomeIcon icon={faTrash} className="icon-btn" style={{ color: "#ff2e2e" }} /></button>
                                            </div>
                                            </li>)}
            </ol>
        </div>
    );
}

export default Todo