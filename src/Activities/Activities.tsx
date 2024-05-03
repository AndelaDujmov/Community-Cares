import Activity from "@/Activity/Activity";
import { useEffect, useState } from "react"
import { FaPlus } from 'react-icons/fa';
import module from './Activities.module.css'
import axios from "axios";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AddActivity } from "./AddActivity";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%', 
        bgcolor: 'black', 
        border: '2px solid white', 
        borderRadius: '2px',
        boxShadow: 45,
        p: 4,
        maxHeight: '80vh', 
        overflowY: 'auto'
      };
      
    useEffect(() => {
        axios
        .get("http://localhost:3001/activities")
        .then(res => setActivities(res.data))
        
    }, [activities])

    return (
        <>
            <br/><br/><br/>
            <div>
            {activities.map(ac => {
               
               return (<Activity activity={ac}/>)
           })}
            </div>
            <button id={module.addActivity} onClick={handleOpen}>
                <FaPlus />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                   <AddActivity />
                </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default Activities;