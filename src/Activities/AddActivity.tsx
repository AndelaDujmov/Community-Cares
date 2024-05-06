"use client"

import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import module from './AddActivity.module.css'
import axios from "axios"
import { Formik } from 'formik';

interface AddActivityProps {
  cities: any,
  orgs: any
}

const obradi = (objekt) => {
  return {
      "ime" : objekt.ime,
      "opis": objekt.opis,
      "udruga": objekt.udruga ?? null,
      "datum": objekt.datum.toISOString(),
      "grad": objekt.grad,
      "ulica": objekt.ulica,
      "sudionici": []
    }
}

export function AddActivity({ cities, orgs }: AddActivityProps) {
  const [activity, setActivity] = useState({
    ime: "",
    opis: "",
    udruga: "",
    datum: new Date(0),
    grad: "",
    ulica: "",
    sudionici: [
    ]
  })
  const [checked, setChecked] = useState(false);

  useEffect(() => {
  
    axios
    .get("http://localhost:3001/organisations")
    .then(rez => setUdruge(rez.data))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  }

  const handleDateInputChange = (e) => {
    const { name, value } = e.target;
    const date = new Date(value); 
    setActivity({ ...activity, [name]: date });
  };

  function onSubmit(event) {
    const dataToParse = obradi(activity)
    axios
    .post("http://localhost:3001/activities", dataToParse)
    .then(rez => {
      toast({
        title: "Succesfully added!"
  
      })
    })
    .catch(err => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request."
      })
    })
   
  }

  return (
    <form onSubmit={onSubmit} className={module.formContainer}>
    <div>
      <label>
        Ime:
        <input
          type='text'
          name='ime'
          value={activity.ime}
          onChange={handleInputChange}
          required
        />
      </label>
    </div>
    <div>
      <label>
        Opis:
        <textarea
          name='opis'
          value={activity.opis}
          onChange={handleInputChange}
          required
        ></textarea>
      </label>
    </div>
    <div>
        <label>
          <input type="radio" onClick={() => setChecked(true)} checked={checked} /> Yes 
        </label>&nbsp; &nbsp;
        <label>
          <input type="radio"  onClick={() => setChecked(false)} checked={!checked} /> No
        </label>
        </div>
      {checked && (
        <div>
        <label>
          Udruga:
          <select name='udruga' value={activity.udruga} onChange={handleInputChange} required>
            <option value=''>Udruga</option>
            {orgs.map(org => (
              <option key={org.id} value={org.id} className={module.input}>{org.ime}</option>
            ))}
          </select>
        </label>
      </div>
      )}
    <div>
      <label>
        Datum:
        <input
          type='date'
          name='datum'
          value={activity.datum.toISOString().split('T')[0]}
          onChange={handleDateInputChange}
          required
        />
      </label>
    </div>
    <div>
      <label>
        Grad:
        <select name='grad' value={activity.grad} onChange={handleInputChange} required>
          <option value=''>Select Grad</option>
          {cities.map(grad => (
            <option key={grad.id} value={grad.grad} className={module.input}>{grad.grad}</option>
          ))}
        </select>
      </label>
    </div>
    <div>
      <label>
        Ulica:
        <input
          type='text'
          name='ulica'
          value={activity.ulica}
          onChange={handleInputChange}
          required
        />
      </label>
    </div>
    <button type='submit'>Kreiraj</button>
  </form> 
  )
}

