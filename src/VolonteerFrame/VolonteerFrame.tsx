import { useState } from 'react';
import module from './VolonteerFrame.module.css'
import Modal from '@mui/material/Modal/Modal';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { toast } from '@/components/ui/use-toast';


interface VolonteerFrameProps {
    volonteer: any,
    admin: boolean,
    cities: any
}

const VolonteerFrame = ({ volonteer, admin, cities } : VolonteerFrameProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedVolonteer, setEditedVolonteer] = useState(volonteer);

    const handleEditMode = () => setEditMode(!editMode);
    const handleDelete = (id) => {
        axios
        .delete(`http://localhost:3001/volonteers/${id}`)
        .then(rez => {
            toast({
                title: "Uspješno izbrisano!"
              })
        })
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedVolonteer(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleEditSubmit = () => {
        
        setEditMode(false); 
        axios.put(`http://localhost:3001/volonteers/${volonteer.id}`, editedVolonteer)
             .then(response => {
                toast({
                    title: "Uspješno uređeno!"
                  })
            })
        
    }

    return (
        <div className={module.frame}>
            <div className={module.imgContainer}>
            <img
                src="https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
                alt="Your Image"
                className={module.image}
                onClick={toggleModal}
            />
            <br/>
            <h2>{volonteer.prezime}, {volonteer.ime}</h2>
            </div>
            <Modal
                open={modalOpen}
                onClose={toggleModal
                }>
                <div className={module.modalContent}>
                    {editMode ? (
                        <>
                        <br/>
                        <input className={module.inputField} type="text" name="ime" value={editedVolonteer.ime} onChange={handleChange} />
                        <input className={module.inputField} type="text" name="prezime" value={editedVolonteer.prezime} onChange={handleChange} /><br/>
                        <select className={module.inputField} name='grad' value={volonteer.grad} onChange={handleChange} required>
                            <option value=''>Select Grad</option>
                            {cities.map(grad => (
                                <option key={grad.id} value={grad.grad} className={module.input}>{grad.grad}</option>
                            ))}
                        </select><br/>
                        <input className={module.inputField} type="text" name="email" value={editedVolonteer.email} onChange={handleChange} />
                        <br/><button className={module.submitButton} onClick={handleEditSubmit}>Submit</button>
                        </>
                    ) : (
                        <>
                            <h2>{volonteer.ime} {volonteer.prezime}</h2>
                            <p>E-mail: {volonteer.email}</p>
                            <p>Grad: {volonteer.grad}</p>
                            <p>Datum pridruživanja: {volonteer.datumPocetka}</p>
                            <button className={module.closeButton} onClick={toggleModal}>
                                Close
                            </button>
                            {admin && (
                                <button className={module.editButton} onClick={handleEditMode}>
                                    Edit
                                </button>
                            )}
                            {admin && (
                                <button className={module.deleteButton} onClick={() => handleDelete(volonteer.id)}>
                                    <FaTrash />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </Modal>
          
        </div>
    )

}

export default VolonteerFrame;