

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Todo from './Todo';
import { Grid } from '@mui/material';
import { v4 as id } from 'uuid';
import { useState } from 'react';
import { TodosContext } from './contexts/todoContext';
import { useContext } from 'react';
import { useEffect } from 'react';

export default function TodoList() {
  const {todos,setTodos} = useContext(TodosContext)
  const [titletodo, settitletodo] = useState('')
  const [displayedTodosType, setdisplayedTodosType] = useState('all')


  const completedTodos = todos.filter((t) =>{
    return t.isCompleted
  })
  const notCompletedTodos = todos.filter((t) =>{
    return !t.isCompleted
  })
  let todosToRender = todos

  if(displayedTodosType == 'done'){
    todosToRender = completedTodos
  }else if (displayedTodosType == 'in-progress' ) {
    todosToRender = notCompletedTodos
  } else {
    todosToRender = todos
  }

  const tododrop = todosToRender.map((e)=>{
    return (<Todo todoit={e} key={e.id}  />)
  })
  useEffect(()=>{
      const storagetodos = JSON.parse(localStorage.getItem('todos')) ?? [] ;
      setTodos(storagetodos)
  },[])

  function displayType(e) {
    setdisplayedTodosType(e.target.value);
  }

  function handelClick(){
    const newtodo = {
      id: id(),
      title: titletodo,
      details: "",
      isCompleted : false
    }
    const updatetodos = [...todos, newtodo]
    setTodos(updatetodos)
    localStorage.setItem('todos', JSON.stringify(updatetodos))
    settitletodo("")
  }
  
  return (
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275,marginTop:5 }} style={{backgroundColor:'#161A2B',borderRadius:'10px', maxHeight:'80dvh',overflow:'scroll' }}>
          <CardContent >
            <Typography sx={{ fontSize: 24, color:"white",fontWeight:'bold'}} >
              What's the Plan for Today?
            </Typography>
            <Grid container spacing={0} sx={{marginTop:'30px'}} justifyContent="center" alignItems="center">
              <Grid xs ={10}>
              <input type='text' style={{backgroundColor:'#161A2B', width:'100%',height:'100%',outline:'none', border:'solid 2px #630bff',borderRight:'none',color:'white',fontSize:'20px',padding:'15px'}} value={titletodo} onChange={(e) =>{
                settitletodo(e.target.value)
              }} />
              </Grid>
              <Grid xs ={2}>
                <Button variant='contained' sx={{background: 'linear-gradient(90deg, rgba(99,11,255,1) 0%, rgba(142,2,251,1) 100%)',borderRadius:'1px'}} onClick={handelClick} disabled = {titletodo.length <= 0}>Add Task</Button>
              </Grid>
            </Grid>
            {tododrop}
          </CardContent>
          <ButtonGroup variant="text" sx={{padding:'10px'}} value={displayedTodosType} onClick={displayType}>
          <Button sx={{color:'white',fontWeight:'bold'}} value='all'>All</Button>
          <Button sx={{color:'white',fontWeight:'bold'}} value='in-progress'>In progress</Button>
          <Button sx={{color:'white',fontWeight:'bold'}} value='done'>Done</Button>
      </ButtonGroup>
        </Card>
      </Container>
  );
}