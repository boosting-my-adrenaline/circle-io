// import React, { useEffect, useRef, useState } from 'react';
// import './App.css';

// window.MediaAlphaExchange = {
//     test: 'testing',
// };

// export const App = () => {
//     const [tasks, setTasks] = useState([
//         { id: '123423', title: 'first task' },
//         { id: '235454', title: 'second task' },
//         { id: '453413', title: 'third task' },
//     ]);

//     const [active, setActive] = useState(0);

//     useEffect(() => {
//         localStorage.clear();
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//     }, [tasks]);

//     const addTask = (title) => {
//         let task = {
//             id: Math.floor(Math.random() * 1000000).toString(),
//             title,
//         };
//         setTasks((prev) => [task, ...prev]);
//     };

//     const [emailInput, setEmailInput] = useState('');

//     const handleDelete = (id) => {
//         setTasks((prev) => prev.filter((task) => task.id !== id));
//     };

//     const handleSubscribe = () => {
//         console.log(emailInput);
//     };

//     useEffect(() => {
//         localStorage.setItem(
//             'ffr7',
//             JSON.stringify({ data: { data: { vehicleYear_1: 2017 } } })
//         );
//         console.log(
//             JSON.parse(localStorage.getItem('ffr7')).data.data.vehicleYear_1
//         );
//     }, []);

//     return (
//         <div className="App">
//             <div className="test">
//                 {[0, 1, 2].map((el) => (
//                     <a
//                         className={el === active ? 'asd selecte' : 'asd'}
//                         onClick={() => setActive(el)}
//                     >
//                         {el === 0 ? 'zero' : el === 1 ? 'one' : 'two'}
//                     </a>
//                 ))}
//             </div>
//             active: {active}
//             <h1>Welcome CY</h1>
//             <TaskCreator addTask={addTask} />
//             <ul>
//                 {tasks.length ? (
//                     tasks.map((task) => (
//                         <Task
//                             key={task.id}
//                             title={task.title}
//                             onDelete={() => handleDelete(task.id)}
//                         />
//                     ))
//                 ) : (
//                     <li>No Tasks Yet</li>
//                 )}
//             </ul>
//             <Input
//                 title={'Subscribe to our Newsletter!'}
//                 value={emailInput}
//                 placeholder={'Enter your email'}
//                 setValue={setEmailInput}
//                 buttonTitle={'Subscribe'}
//                 onSubmit={handleSubscribe}
//             />
//         </div>
//     );
// };

// const TaskCreator = ({ addTask }) => {
//     const inputRef = useRef();

//     const handleSubmit = () => {
//         addTask(inputRef.current.value);
//         inputRef.current.value = '';
//     };

//     return (
//         <div className="create">
//             <input ref={inputRef} />
//             <button onClick={handleSubmit}>Create Task</button>
//         </div>
//     );
// };

// const Task = ({ title, onDelete }) => {
//     return (
//         <li>
//             <span>{title}</span>
//             <button onClick={onDelete}>X</button>
//         </li>
//     );
// };

// const Input = ({
//     title,
//     value,
//     setValue,
//     placeholder,
//     buttonTitle,
//     onSubmit,
// }) => {
//     const handleInput = (event) => {
//         setValue(event.currentTarget.value.replace(' ', ''));
//     };

//     const handleSubmit = () => {
//         onSubmit();
//         setTimeout(() => setValue(''), 100);
//     };
//     return (
//         <div className="subscribe">
//             <span>{title}</span>
//             <br />
//             <input
//                 id="emailInput"
//                 value={value}
//                 onChange={handleInput}
//                 placeholder={placeholder}
//             />
//             <button onClick={handleSubmit}>{buttonTitle}</button>
//         </div>
//     );
// };
