import { useEffect, useState } from 'react'
import module from './Volonteers.module.css'

import Select from 'react-select'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface VolonteersProps {
    gradovi: any
}


const Volonteers = ({ gradovi }: VolonteersProps) =>{

    const [filterActivities, setFilterActivities] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

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

    const options = gradovi.map(grad => ({value: grad.grad, label: grad.grad}))

    useEffect(() => {
        axios
        .get("http://localhost:3001/filter")
        .then(rez => setFilterActivities(rez.data))
        .catch(err => console.log(err));
    }, [])

    return (
    <>
    <div id={module.window}>
        <div id={module.filters}>
            <div>
                <Select options={options} id={module.select} placeholder={"Grad"}/><br>
                </br>
            </div>
            <div id={module.fieldset}>
            
            <fieldset>
                {filterActivities.map(fa => (
                    <div className={module.checkboxContainer}>
                     <label>
                        <input type="checkbox" name="boja" value="crvena" />
                        {fa.ime}
                     </label>
                     <br/>
                     </div>
                ))}
               
            </fieldset>
            </div>
            
            <div className={module.addButtonContainer}>
                <button id={module.addActivity} onClick={handleOpen} className={module.roundedButton}>
                    <span className={module.icon}>
                        <FaPlus />
                    </span>
                </button>
                <span className={module.text}>Novi</span>
            </div>

        </div>
        <div id={module.content}>Kontent</div>
    </div> 
    </>)
}

export default Volonteers;
