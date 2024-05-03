"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import module from './AddActivity.module.css'
import axios from "axios"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const obradi = (objekt) => {
  return {
      "ime" : objekt.ime,
      "ops": objekt.opis,
      "udruga": objekt.udruga ?? null,
      "datum": objekt.datum.toISOString(),
      "grad": objekt.grad,
      "ulica": objekt.ulica,
      "sudionici": []
    }
}

export function AddActivity() {
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
  const [gradovi, setGradovi] = useState([]);
  const [udruge, setUdruge] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios
    .get("http://localhost:3001/cities")
    .then(rez => setGradovi(rez.data));

    axios
    .get("http://localhost:3001/organisations")
    .then(rez => setUdruge(rez.data))
  }, [])


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        username: "",
        date: new Date(),
        city: "",
        street: "",
        isOrganization: "",
        organization: "",
        additionalInfo: "",
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  }

  const handleDateInputChange = (e) => {
    const { name, value } = e.target;
    const date = new Date(value); 
    setActivity({ ...activity, [name]: date });
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }


  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <FormField
          control={form.control}
          name="ime"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Naziv aktivnosti"
                  {...field}
                  className={module.input}
                  value={activity.ime}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="datum"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className={module.input}
                  value={activity.datum.toISOString().slice(0, 10)}
                  onChange={handleDateInputChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <select {...field} className={module.input}>
                <option value="">--Grad--</option>
                {gradovi.map(grad => (
                    <option key={grad.id}  value={activity.date}
                    onChange={handleInputChange}>{grad.grad}</option>
                ))}
            </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ulica"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Ulica"
                  {...field}
                  className={module.input}
                  value={activity.ulica}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="isOrganisation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
               <div>
               <label>
                  <input type="radio" onClick={() => setChecked(true)} {...field} /> Yes 
                </label>&nbsp; &nbsp;
                <label>
                  <input type="radio"  onClick={() => setChecked(false)}{...field} /> No
                </label>
               </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {checked && ( 
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <select {...field} className={module.input}>
                    <option value="">--Udruga--</option>
                    {udruge.map(u => (
                    <option key={u.id}  value={activity.udruga}
                    onChange={handleInputChange}>{u.ime}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
       
       <FormField
          control={form.control}
          name="opis"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Opis"
                  {...field}
                  className={module.input}
                  value={activity.opis}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" onClick={onSubmit}>Kreiraj</Button>
      </form>
    </Form>
  )
}
