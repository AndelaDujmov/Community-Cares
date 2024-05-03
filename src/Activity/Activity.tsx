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
import { z } from "zod"
import { InputForm } from '@/Volonteer/InputForm';
import AddActivity from '@/Activities/AddActivity';

interface ActivityProps {
    activity: any
}

const Activity = ({ activity }: ActivityProps) => {

    const parseDate = (dateString) => {
        const date = new Date(dateString);

        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2); 
        const year = date.getFullYear();
        const hours = ('0' + date.getHours()).slice(-2); 
        const minutes = ('0' + date.getMinutes()).slice(-2);

        return `${month}.${day}.${year} ${hours}:${minutes}`;
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
                
                <Button id={module.smece} variant="destructive"><FaTrash /></Button>
            </div>
           
        </div>
    )
}

export default Activity;