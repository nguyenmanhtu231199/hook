
import { useEffect, useState } from 'react';
import './App.scss';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
function App() {
  const [todoList, setTodoList]= useState([
    { id: 1, title :'Anh yeu em '},
    { id : 2, title :' Anh nho em '},
    { id: 3, title : ' Anh can em '},
  ]);
  const [postList,setPostList]= useState([]);
  useEffect(()=>{
async function fetchPostList (){
  try {
  const requestUrl ='http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
  const response = await fetch(requestUrl);
  const responseJson = await response.json();
  console.log({responseJson});
  const {data}=responseJson;
  setPostList(data);
    
  } catch (error) {
    console.log('Failed ', error.message);
  }
}
fetchPostList();
  },[]);
function handleTodoClick(todo){
const index = todoList.findIndex(x => x.id == todo.id);
if(index <0) return;
const newTodoList =[...todoList];
newTodoList.splice(index,1);
setTodoList(newTodoList);
}
function handleTodoFormSubmit(formValues){
  const newTodo ={
    id: todoList.length +1,
    ...formValues,
  };
  const newTodoList=[...todoList];
  newTodoList.push(newTodo);
  setTodoList(newTodoList);
}
  
  return (
    <div className="app">
      <h1>anhyeuem</h1>
      <ColorBox/>
      <TodoForm  onsubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
      <PostList posts={postList} />
    </div>
  );
}

export default App;
