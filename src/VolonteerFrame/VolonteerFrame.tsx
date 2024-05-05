import { useState } from 'react';
import module from './VolonteerFrame.module.css'
import Modal from '@mui/material/Modal/Modal';


interface VolonteerFrameProps {
    volonteer: any,
    admin: boolean
}

const VolonteerFrame = ({ volonteer, admin } : VolonteerFrameProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
      };

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
                <h2>{volonteer.ime} {volonteer.prezime}</h2>
                <p>E-mail: {volonteer.email}</p>
                <p>Grad: {volonteer.grad}</p>
                <p>Datum pridruživanja: {volonteer.datumPocetka}</p>
                <button className={module.closeButton} onClick={toggleModal}>
                    Close
                </button>
                {admin && (
                    <button className={module.editButton} onClick={toggleModal}>
                    Edit
                    </button>
                )}
                </div>
            </Modal>
          
        </div>
    )

}

export default VolonteerFrame;