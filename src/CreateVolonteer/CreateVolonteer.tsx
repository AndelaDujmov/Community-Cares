import { useState } from 'react';
import module from './CreateVolonteer.module.css';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

interface CreateVolonteerProps {
    cities: any,
    filters: any
}

const CreateVolonteer = ({ cities, filters } : CreateVolonteerProps) => {
    const [volonteer, setVolonteer] = useState({
        ime: "",
        prezime: "",
        slika: "",
        email: "",
        datumPocetka: new Date(),
        grad: "",
        aktivnost: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVolonteer({ ...volonteer, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setVolonteer({ ...volonteer, aktivnosti: [...volonteer.aktivnosti, value] });
        } else {
            setVolonteer({ ...volonteer, aktivnosti: volonteer.aktivnosti.filter(item => item !== value) });
        }
    };

    const obradi = (objekt) => {
        return {
            "ime" : objekt.ime,
            "prezime": objekt.prezime,
            "slika": objekt.slika ?? null,
            "email": objekt.email ?? null,
            "datumPocetka": objekt.datumPocetka.toISOString(),
            "grad": objekt.grad,
            "aktivnost": objekt.aktivnosti
        };
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const dataToParse = obradi(volonteer);
        axios
        .post("http://localhost:3001/volonteers", dataToParse)
        .then(rez => {
            toast({
                title: "Successfully added!"
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
        <form onSubmit={onSubmit}>
            <div>
                <input
                    type='text'
                    name='ime'
                    placeholder='Ime'
                    value={volonteer.ime}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <input
                    type='text'
                    name='prezime'
                    placeholder='Prezime'
                    value={volonteer.prezime}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <input
                    type='text'
                    name='email'
                    placeholder='E-mail'
                    value={volonteer.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <select name='grad' value={volonteer.grad} onChange={handleInputChange} required>
                    <option value=''>Select Grad</option>
                    {cities.map(grad => (
                        <option key={grad.id} value={grad.grad} className={module.input}>{grad.grad}</option>
                    ))}
                </select>
            </div>
            <div>
                {filters.map(filter => (
                    <label key={filter.id} className={module.checkboxLabel}>
                        <input
                            type='checkbox'
                            name={filter.ime}
                            value={filter.ime}
                            checked={volonteer.aktivnosti.includes(filter.ime)}
                            onChange={handleCheckboxChange}
                        />
                        {filter.ime}
                    </label>
                ))}
            </div>
            <button type='submit'>Kreiraj</button>
        </form>
    );
};

export default CreateVolonteer;
