
import TodoList from './TodoList'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { TodosContext } from './contexts/todoContext';
import { v4 as id } from 'uuid';
import { useState } from 'react';
const theme = createTheme({
  typography:{
    fontFamily: "acumin-pro"
  }
});
const todoList = []
function App() {
  const [todos, setTodos]= useState(todoList)
  return (
    <ThemeProvider theme={theme}>
    <div style={{
      display:"flex",
      justifyContent: "center",
      alignItems:"center",
      height:'100dvh',
      background:"linear-gradient(90deg, rgba(55,30,255,1) 0%, rgba(93,100,255,1) 100%)",
      fontWeight:'bold',
      textAlign:'center'
    }}>
      <TodosContext.Provider value={{todos,setTodos}}>
      <TodoList />
      </TodosContext.Provider>
    </div>
    </ThemeProvider>
  )
}

export default App
