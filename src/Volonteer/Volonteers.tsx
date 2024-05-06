import { useEffect, useState } from 'react'
import module from './Volonteers.module.css'
import Select from 'react-select'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import VolonteerFrame from '@/VolonteerFrame/VolonteerFrame'
import CreateVolonteer from '@/CreateVolonteer/CreateVolonteer'
import { toast } from '@/components/ui/use-toast'

interface VolonteersProps {
    cities: any,
    volonteers: any,
    admin: boolean
}

const Volonteers = ({ cities, volonteers, admin }: VolonteersProps) =>{

    const [filterActivities, setFilterActivities] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [selectedOptions, setSelectedOptions] = useState([])
    const [filteredVolonteers, setFilteredVolonteers] = useState(volonteers);
    const [open, setOpen] = useState(false); 

    const handleOpen = () => setOpen(!open);

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

      const options = [
        { value: 'all', label: 'Svi' },
        ...cities.map(city => ({ value: city.grad, label: city.grad }))
    ];

    const filterVolonteers = (event) => {
        const { value } = event;
    if (value === 'all') {
        // If "All" is selected, set selectedOptions to include all option values except 'all'
        const allOptionValues = options.filter(option => option.value !== 'all').map(option => option.value);
        setSelectedOptions(allOptionValues);
        setSelectedCity(null); // Clear selected city
    } else {
        // Otherwise, set selectedCity as usual
        setSelectedCity(value);
        setSelectedOptions([]); // Clear selected options
    }
    }

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedOptions([...selectedOptions, value]); 
            console.log(selectedOptions)
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== value)); 
        }
    }

    useEffect(() => {
        axios
        .get("http://localhost:3001/filter")
        .then(rez => setFilterActivities(rez.data))
        .catch(err => console.log(err));

        const filtered = volonteers.filter(volonteer => {
            const cityMatches = !selectedCity || volonteer.grad === selectedCity;
            const selectedCheckboxes = selectedOptions.every(option => 
                volonteer.aktivnost && volonteer.aktivnost.includes(option)
            );
            return cityMatches && selectedCheckboxes;
        }); 
        
        
        setFilteredVolonteers(filtered);
        
    }, [selectedCity, selectedOptions, volonteers])

    return (
    <>
    <div id={module.window}>
        <div id={module.filters}>
            <div>
            <Select options={options} id={module.select} placeholder={"Grad"} value={options.find(option => option.value === selectedCity)} onChange={filterVolonteers} >

            </Select>  <br/>  <br/>   
            </div>
            <div id={module.fieldset}>
            
            <fieldset>
                {filterActivities.map(fa => (
                    <div className={module.checkboxContainer}>
                     <label>
                        <input
                         type="checkbox" 
                         name="boja" 
                         value={fa.ime}
                         checked={selectedOptions.includes(fa.ime)} 
                         onChange={handleCheckboxChange}
                         />
                        {fa.ime}
                     </label>
                     <br/>
                     </div>
                ))}
               
            </fieldset>
            </div>
            
           {admin && (
             <div className={module.addButtonContainer}>
             <button id={module.addActivity} onClick={handleOpen} className={module.roundedButton}>
                 <span className={module.icon}>
                     <FaPlus />
                 </span>
             </button>
             <span className={module.text}>Novi</span>
             <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <CreateVolonteer cities={cities} filters={filterActivities} />
                </Typography>
                </Box>
            </Modal>
         </div>

           )}

        </div>
        <div id={module.content}>
            {filteredVolonteers.map(
                volonteer => (
                    <VolonteerFrame volonteer={volonteer} admin={admin} cities={cities} />
                )
            )}
        </div>
    </div> 
    </>)
}

export default Volonteers;