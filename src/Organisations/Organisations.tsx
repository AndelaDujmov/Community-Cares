import { Separator } from "@/components/ui/separator"
import module from './Organisations.module.css'
import ScrollList from "@/ScrollList/ScrollList"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Create from "@/Organisation/Create"

interface OrganisationsProps {
    organisations: any,
    cities: any,
    admin: boolean
}

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

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

const Organisations = ({ organisations, cities, admin }: OrganisationsProps) => {
    const [requestedOrganisations, setRequestedOrganisations] = useState([]);
    const [acceptedOrganisations, setAcceptedOrganisations] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setAcceptedOrganisations(organisations.filter(organisation => organisation.odobreno));
        setRequestedOrganisations(organisations.filter(organisation => !organisation.odobreno));
    }, [requestedOrganisations, acceptedOrganisations])

    return (
    <>
       <div id={module.separate}>
            <h2>Udruge</h2>
            <Separator className="my-2" />
            <div className="w-70vw mx-auto" id={module.main}>
                <ScrollList objectList={acceptedOrganisations} />      
            </div>
           
            {admin && (
                <>
                 <h2>Zahtjevi za udruge</h2>
                <Separator className="my-2" />
                <div className="w-70vw mx-auto" id={module.main}>
                    <ScrollList objectList={requestedOrganisations} />      
                </div>
                </>
            )}

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
                    <Create cities={cities} />
                </Typography>
                </Box>
            </Modal>
       </div>
    </>)
}

export default Organisations;