import { useState } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import module from "./MainPage.module.css"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Avatar } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Activities from "@/Activities/Activities";
  

const MainPage = () => {
    const [adminMode, setAdminMode] = useState(false)
    return (
    <>
    <div className="bg-primary text-primary-foreground" id={module.menu}>
 
        
        <Card>
        <CardHeader>
            <CardTitle>Community Cares</CardTitle>
            <CardDescription>Opis</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Community Cares je platforma koja povezuje ljude koji žele pružiti pomoć sa onima kojima je potrebna. Naša misija je olakšati donacije i podršku potrebitima diljem svijeta.</p>
            <br/>
            <h2>Kako funkcionira</h2>
            <p>Naša platforma omogućuje korisnicima da pregledavaju različite potrebe i projekte koji trebaju podršku. Možete pronaći različite načine kako pomoći, bilo da je to financijska donacija, volontiranje ili pružanje potrebne opreme ili resursa.</p>
            <h2>Kako možete pomoći</h2>
            <p>Registrirajte se kao volonter i pronađite projekte u vašoj lokalnoj zajednici kojima možete pružiti podršku. Također možete pregledavati različite organizacije i njihove potrebe te donirati novčano ili materijalno.</p>
            <h2>Kontaktirajte nas</h2>
            <br/>
            <div id={module.main}>
                <div id={module.avatar}>
                    <Avatar 
                     sx={{ width: 56, height: 56 }}/>
                </div>
                <div id={module.content}>
                    <p><b>Anđela Dujmov</b></p>
                    <p>Linked In: link</p>
                    <p>GitHub: link</p>
                    <p>Gmail: link</p>
                </div>
            </div>
        </CardContent>
        </Card>

        
        </div>
    </>
    )
}

export default MainPage;