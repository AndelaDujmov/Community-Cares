import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link } from 'react-router-dom';
import module from './NavigationBar.module.css'
import Switch from "@mui/material/Switch";

interface NavigationBarProps {
    admin: boolean,
    setAdmin: any
}

const NavigationBar = ({ admin, setAdmin } : NavigationBarProps) => {

    return (
        <>
            <NavigationMenu className={module.navbar}>
                <NavigationMenuList>
                <NavigationMenuItem>
                <Link to={"/"}  class={module.li}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {"Početna"}
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to={"/activities"} class={module.li}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {"Aktivnosti"}
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to="/volonteers" class={module.li}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {"Volonteri"}
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to="/organisations" class={module.li}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {"Udruge"}
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
              
                <NavigationMenuItem id={module.admin}>
                <div className="flex items-center space-x-2">
                
                <Switch
                    title="Admin"
                    checked={admin}
                    onChange={() => setAdmin(!admin)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                </NavigationMenuItem>
                   
                </NavigationMenuList>
             </NavigationMenu>

        </>
    )
}

export default NavigationBar;