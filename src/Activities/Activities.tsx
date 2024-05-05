import Activity from "@/Activity/Activity";
import { useEffect, useState } from "react"
import { FaPlus } from 'react-icons/fa';
import module from './Activities.module.css'
import axios from "axios";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AddActivity } from "./AddActivity";

interface ActivitiesProps {
    cities: any, 
    admin: boolean,
    orgs: any
}

const Activities = ({ cities, admin, orgs } : ActivitiesProps) => {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([])
    const [open, setOpen] = useState(false);
    const [organisation, setOrganisation] = useState("");

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

    const filterActivities = (activities) => {
        const filtered = activities.map(activity => {
            const organization = orgs.find(org => org.id === activity.udruga);
            if (organization) {
                activity.udruga = organization.ime;
            } else {
                activity.udruga = "Unknown";
            }
            return activity;
        });
        setFilteredActivities(filtered);
    }
      
    useEffect(() => {
        axios
        .get("http://localhost:3001/activities")
        .then(res => setActivities(res.data))

        filterActivities(activities);
        
    }, [activities])

    return (
        <>
            <br/><br/><br/>
            <div>
            {filteredActivities.map(ac => {
               return (<Activity activity={ac} admin={admin} />)
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
                   <AddActivity cities={cities} orgs={orgs} />
                </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default Activities;