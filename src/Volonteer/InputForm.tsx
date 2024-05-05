import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";

interface InputFormProps {
  volonteers: any,
  activity: any
}

export function InputForm({ volonteers, activity }: InputFormProps) {
  const [inputV, setInputV] = useState({
    ime: "",
    prezime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputV((prevInputV) => ({ ...prevInputV, [name]: value }));
  };


    const onSubmit = (event) => {
      event.preventDefault();
      const noviStr = inputV.ime + " " + inputV.prezime;
      const updatedSudionici = [...activity.sudionici, noviStr];

    const isDuplicate = volonteers.some((volonteer) => {
      return (
        volonteer.ime === inputV.ime && volonteer.prezime === inputV.prezime
      );
    });
    console.log(updatedSudionici)
    if (isDuplicate) {
      axios
      .patch(`http://localhost:3001/activities/${activity.id}`, {
          sudionici: updatedSudionici
      })
      .then(rez => {
          toast({
              title: "Volonter dodan!"
          });
      })
      .catch(err => {
          toast({
              variant: "destructive",
              title: "Nešto je pošlo po krivu",
              description: "Naišli smo na problem s Vašim zahtjevom."
          });
      });
    }
    console.log(activity.sudionici)
  }


  return (
    <form onSubmit={onSubmit}>
    <div>
        <input
            type='text'
            name='ime'
            placeholder='Ime'
            value={inputV.ime}
            onChange={handleInputChange}
            required
        />
    </div>
    <div>
        <input
            type='text'
            name='prezime'
            placeholder='Prezime'
            value={inputV.prezime}
            onChange={handleInputChange}
            required
        />
    </div>
    <button type='submit'>Prijava</button>
</form>
  );
}
