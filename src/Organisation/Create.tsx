import axios from 'axios';
import module from './Create.module.css'
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

interface CreateProps {
    cities: any
}

const Create = ({ cities } : CreateProps) => {
    const [organisation, setOrganisation] = useState({
        ime: "",
        adresa: "",  
        grad: "",
        odobreno: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrganisation({ ...organisation, [name]: value });
    };

    const obradi = (objekt) => {
        return {
            "ime" : objekt.ime,
            "adresa": objekt.adresa,
            "grad": objekt.grad,
            "odobreno": objekt.odobreno
        };
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const dataToParse = obradi(organisation);
        axios
        .post("http://localhost:3001/organisations", dataToParse)
        .then(rez => {
            toast({
                title: "Zahtjev je poslan administratoru za odobrenje!"
            });
        })
        .catch(err => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request."
            });
        });
    };


    return (
        <form onSubmit={onSubmit} className={module.formContainer}>
            <div>
                <input
                    type='text'
                    name='ime'
                    placeholder='Ime'
                    value={organisation.ime}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <input
                    type='text'
                    name='adresa'
                    placeholder='Adresa'
                    value={organisation.adresa}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <select name='grad' value={organisation.grad} onChange={handleInputChange} required>
                    <option value=''>Select Grad</option>
                    {cities.map(grad => (
                        <option key={grad.id} value={grad.grad} className={module.input}>{grad.grad}</option>
                    ))}
                </select>
            </div>
           
            <button type='submit'>Kreiraj</button>
        </form>
    )
}

export default Create;