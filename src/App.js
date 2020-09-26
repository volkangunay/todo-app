import React, { useState, useCallback, useEffect } from 'react';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false,
      },
      ...todos
    ]);
    setNewTodo('');
  }, [newTodo, todos]);

  const addTodo = useCallback((todo, index) => (event) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos);
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
    setScore(score - 2)
  }, [todos]);

  const completeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
    setScore(score + 1)
  }, [todos]);

  const markAll = useCallback(() => {
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
      };
    });
    setTodos(updatedTodos);
  }, [todos]);

  const unmarkAll = useCallback(() => {
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: false,
      };
    });
    setTodos(updatedTodos);
  }, [todos]);

  const [score, setScore] = useState(0);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label>
          <p>
            Her todo eklemeniz başına skorunuza + 1 puan eklenir. <br />
          Eklenilen Todoyu sildiğinizde skorunuzdan 2 puanınız gider. <br />
          Eklenilen Todoyu tamamlarsanız skorunuza + 1 puan daha eklenir. <br />
          </p>
        </label>
        <label>Score: {score}</label> <br />
        <label htmlFor="newTodo">Enter Todo</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onNewTodoChange}
        />
        <button onClick={() => setScore(score + 1)}>Add Todo</button>
        <button onClick={markAll}>Mark All</button>
        <button onClick={unmarkAll}>Unmark All</button>
      </form>
      {todos.map((todo, index) => (
        <li key={todo.id}>
          <span className={todo.done ? 'done' : ''}>{todo.content}</span>
          <div className="deleteAndCheck">
            <button onClick={removeTodo(todo)}>Delete Todo</button>
            <button onClick={completeTodo(todo)}>Complete Todo</button>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
          </div>
        </li>
      ))}
    </div>
  );
};



export default App;
