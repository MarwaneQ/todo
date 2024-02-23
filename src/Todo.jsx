import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { TodosContext } from './contexts/todoContext';



export default function Todo({todoit, handelCheck}) {
    const [showDeletDialog,setshowDeletDialog] = useState(false)
    const [showUpdateDialog,setshowUpdateDialog] = useState(false)
    const [updatedtodo,setupdatedtodo]= useState({title:todoit.title, details:todoit.details})
    const {todos,setTodos} = useContext(TodosContext)
    function handelCheckClick(){
        const uptodos = todos.map((t)=>{
            if(t.id == todoit.id ) {
                t.isCompleted = !t.isCompleted
            }
            return t;
        })
        setTodos(uptodos)
        localStorage.setItem('todos', JSON.stringify(uptodos))
    }
    function handelDelete() {
        setshowDeletDialog(true)
    }
    function handelClose() {
        setshowDeletDialog(false)
    }
    function deletConfirm() {
        const updatedTodos = todos.filter((t) => {
            return t.id != todoit.id
        })
        setTodos(updatedTodos)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }
    function handelUpdateClose(){
        setshowUpdateDialog(false)
    }
    function UpdateConfirm() {
        const updatedodosList = todos.map((e)=> {
            if (e.id == todoit.id) {
                return {...e,title: updatedtodo.title , details: updatedtodo.details}
            }else{
                return e
            }
        })
        setTodos(updatedodosList);
        setshowUpdateDialog(false)
        localStorage.setItem('todos', JSON.stringify(updatedodosList))
    }
    function handelUpdate(){
        setshowUpdateDialog(true)
    }
    return(
        <>
        <Dialog
        open={showUpdateDialog}
        onClose={handelUpdateClose}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle>{"Update the task"}</DialogTitle>
        <DialogContent >
        <TextField
            autoFocus
            margin="dense"
            label="Task title"
            fullWidth
            variant="standard"
            value={updatedtodo.title}
            onChange={(e)=>{
                setupdatedtodo({...updatedtodo,title: e.target.value})
            }}
        />
        <TextField
            autoFocus
            margin="dense"
            label="Task Details"
            fullWidth
            variant="standard"
            value={updatedtodo.details}
            onChange={(e)=>{
                setupdatedtodo({...updatedtodo,details: e.target.value})
            }}
        />
        </DialogContent>
        <DialogActions >
            <Button onClick={handelUpdateClose} >Close</Button>
            <Button onClick={UpdateConfirm} >Update</Button>
        </DialogActions>
        </Dialog>

        <Dialog
        open={showDeletDialog}
        onClose={handelClose}
        keepMounted
        
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to delete this task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You can not recover this task if you delete it .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelClose} >Cancel</Button>
          <Button onClick={deletConfirm} >Yes</Button>
        </DialogActions>
        </Dialog>
            <Card sx={{ minWidth: 275 ,marginTop:5 }} style={{backgroundColor:'#eee'}} className='todocard'>
                <CardContent >
                    <Grid container spacing={2}>
                        <Grid xs={8}>
                        <Typography sx={{ fontSize: 20 ,color:"black",textAlign:'left',fontWeight:'bold',textDecoration: todoit.isCompleted ? 'line-through' : "none"}}  variant='h5'  >
                        {todoit.title}
                    </Typography>
                    <Typography sx={{ fontSize: 18 ,color:"black",textAlign:'left',}}  variant='h6'  >
                        {todoit.details}
                    </Typography>
                        </Grid>
                        <Grid xs={4} display="flex" justifyContent="flex-end" alignItems="center">
                            <IconButton className='button'  sx={{color:'#00e676'}} onClick={()=>{
                                handelCheckClick()
                            }} style={{ color: todoit.isCompleted ? '#00e676' : 'black'}}>
                            <TaskAltRoundedIcon  />
                            </IconButton>
                            <IconButton className='button' sx={{color:'#3f51b5'}} onClick={handelUpdate}>
                            <EditNoteRoundedIcon  />
                            </IconButton>
                            <IconButton className='button' sx={{color:'#ff1744'}} onClick={handelDelete}>
                            <DeleteOutlineRoundedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    
                </CardContent>
            </Card>
        </>
    )
} 