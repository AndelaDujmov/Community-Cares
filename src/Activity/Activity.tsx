import module from './Activity.module.css'
import { Button } from "@/components/ui/button"
import { FaInfo, FaTrash } from 'react-icons/fa';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
"use client"
import { InputForm } from '@/Volonteer/InputForm';
import { useState } from 'react';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

interface ActivityProps {
    activity: any,
    admin: boolean
}

const Activity = ({ activity, admin }: ActivityProps) => {
    const [id] = useState(activity.id);

    const parseDate = (dateString) => {
        const date = new Date(dateString);

        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2); 
        const year = date.getFullYear();

        return `${month}.${day}.${year}`;
    }

    const handleDelete = () => {
        axios
        .delete(`http://localhost:3001/activities/${id}`)
        .then(rez => {
            toast({
                title: "Succesfully deleted!"
              })
        })
    }

    return (
        <div id={module.card}>
            <div id={module.left}>
                <div>
                    <h2 id={module.nameEvent}>{activity.ime}</h2><br/>
                    <p id={module.date}>{parseDate(activity.datum)}</p>
                </div>
                <div>
                
                </div>
               
            </div>
            <div id={module.right}>
                <Sheet>
                    <SheetTrigger><FaInfo /></SheetTrigger>
                    <SheetContent id={module.sheets}>
                        <SheetHeader>
                        <SheetTitle>{activity.ime}</SheetTitle>
                        <SheetDescription>
                           <div id={module.main}>
                            <div id={module.textSide}>
                                <br/><br/>
                                <p><b>Datum:</b> {parseDate(activity.datum)}</p>
                                <p><b>Opis:</b> {activity.opis}</p>
                                <p><b>Udruga:</b> {activity.udruga}</p>
                                <p><b>Mjesto događanja:</b> {activity.grad}, {activity.ulica}</p>
                            </div>
                            <div id={module.mapSide}><p>mapa</p></div>
                           </div>
                           <div><InputForm /></div>
                           <br />
                           <div id={module.border}></div>
                          
                        </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                &nbsp;&nbsp;
                
                {admin && (<Button id={module.smece} onClick={handleDelete} variant="destructive"><FaTrash /></Button>)}
            </div>
           
        </div>
    )
}

export default Activity;