
import { useEffect, useState } from 'react';
import './App.scss';
import queryString from 'query-string';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';

function App() {
  const [todoList, setTodoList]= useState([
    { id: 1, title :'Anh yeu em '},
    { id : 2, title :' Anh nho em '},
    { id: 3, title : ' Anh can em '},
  ]);
  const [postList,setPostList]= useState([]);
  const [pagination, setPagination]= useState({
    _page: 1,
    _limit :10,
    _totalRows : 1,
  });
  const [filters, setFilters]= useState({
    _limit: 10,
    _page:1,

  });
  useEffect(()=>{
async function fetchPostList (){
  try {
    const paramsString= queryString.stringify(filters);
  const requestUrl =`http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
  const response = await fetch(requestUrl);
  const responseJSON = await response.json();
  console.log({responseJSON});
  const {data,pagination}=responseJSON;
  setPostList(data);
   setPagination(pagination); 
  } catch (error) {
    console.log('Failed ', error.message);
  }
}
fetchPostList();
  },[filters]);
function handlePageChange(newPage){
  console.log('new page :', newPage);
  setFilters ({
    ...filters,
    _page: newPage,
  });
}
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
      <PostList posts={postList} />
      <Pagination 
      pagination={pagination}
      onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
