import { useEffect, useState } from 'react';
import axios from 'axios';

// const API_URL = 'http://localhost:5000/todos'; // Change this in deployment0
const API_URL = 'https://crudoperation-backend-xryy.onrender.com';

// console.log("Loaded API URL:", import.meta.env.VITE_API_URL);
// const API_URL = import.meta.env.VITE_API_URL;
// console.log("API URL:", import.meta.env.VITE_API_URL);
// console.log("VITE_API_URL:", import.meta.env.VITE_API_URL, API_URL);
// console.log("VITE_API_URL:", import.meta.env);
// console.log("API URL:", API_URL); // Check if it logs correctly

// fetch(`${API_URL}/users`)
//   .then(response => response.json())
//   .then(data => console.log(data));

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(API_URL).then(res => setTodos(res.data));
  }, []);

  // useEffect(() => {
  //   fetch(`${API_URL}/todos`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("API Response:", data);
  //       if (!Array.isArray(data)) {
  //         console.error("Expected an array but got:", data);
  //       }
  //     })
  //     .catch(err => console.error("Error fetching todos:", err));
  // }, []);
  
  

  const addTodo = () => {
    axios.post(API_URL, { text }).then(res => {
      setTodos([...todos, res.data]);
      setText('');
    });
  };

  const toggleTodo = (id, completed) => {
    axios.put(`${API_URL}/${id}`, { completed: !completed }).then(res => {
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span onClick={() => toggleTodo(todo._id, todo.completed)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


// import { useEffect, useState } from 'react';
// import axios from 'axios';

// // Debugging: Check if VITE_API_URL is correctly loaded
// // console.log("VITE_API_URL:", import.meta.env);
// // const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = 'http://localhost:5000/todos';
// console.log("Resolved API URL:", API_URL);

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [text, setText] = useState('');

//   // Fetch Todos
//   useEffect(() => {
//     fetch(`${API_URL}/todos`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("API Response:", data);
//         if (!Array.isArray(data)) {
//           console.error("Expected an array but got:", data);
//         } else {
//           setTodos(data);
//         }
//       })
//       .catch(err => console.error("Error fetching todos:", err));
//   }, []);

//   // Add Todo
//   const addTodo = () => {
//     axios.post(`${API_URL}/todos`, { text }) // ✅ Fix API endpoint
//       .then(res => {
//         setTodos([...todos, res.data]);
//         setText('');
//       })
//       .catch(err => console.error("Error adding todo:", err));
//   };

//   // Toggle Todo Completion
//   const toggleTodo = (id, completed) => {
//     axios.put(`${API_URL}/todos/${id}`, { completed: !completed }) // ✅ Fix API endpoint
//       .then(res => {
//         setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
//       })
//       .catch(err => console.error("Error updating todo:", err));
//   };

//   // Delete Todo
//   const deleteTodo = (id) => {
//     axios.delete(`${API_URL}/todos/${id}`) // ✅ Fix API endpoint
//       .then(() => {
//         setTodos(todos.filter(todo => todo._id !== id));
//       })
//       .catch(err => console.error("Error deleting todo:", err));
//   };

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <input value={text} onChange={(e) => setText(e.target.value)} />
//       <button onClick={addTodo}>Add</button>
//       <ul>
//         {todos.map(todo => (
//           <li key={todo._id}>
//             <span onClick={() => toggleTodo(todo._id, todo.completed)}
//               style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
//               {todo.text}
//             </span>
//             <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
