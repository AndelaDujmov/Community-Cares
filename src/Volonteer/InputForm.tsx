"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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

const FormSchema = z.object({
  username: z
  .string()
  .min(2, {
    message: "Ime mora imati barem dva znaka!",
  })
  .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
    message: "Ime ne smije sadržavati posebne znakove"
  })
  ,
  lastName: z
  .string()
  .min(4, {
    message: "Prezime mora imati barem četiri znaka!",
  })
  .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
    message: "Prezime ne smije sadržavati posebne znakove"
  })
})

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      lastName: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/4 space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ime" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Prezime" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Prijava</Button>
      </form>
    </Form>
  )
}
