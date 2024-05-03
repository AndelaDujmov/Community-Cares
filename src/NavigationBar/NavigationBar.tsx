import NavigationButton from "../NavigationButton/NavigationButton";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link } from 'react-router-dom';
import module from './NavigationBar.module.css'
import { Switch } from "@/components/ui/switch"
import FormControl from "@mui/material/FormControl";




const NavigationBar = () => {

    return (
        <>
            <NavigationMenu className={module.navbar}>
                <NavigationMenuList>
                <NavigationMenuItem>
                <Link to={"/"} legacyBehavior passHref class={module.li}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {"Početna"}
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to={"/activities"} legacyBehavior passHref  class={module.li}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {"Aktivnosti"}
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to="/volonteers" legacyBehavior passHref  class={module.li}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {"Volonteri"}
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to="/organisations" legacyBehavior passHref  class={module.li}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {"Udruge"}
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem id={module.admin}>
                <div className="flex items-center space-x-2">
                    <Switch  />
     
                </div>
                </NavigationMenuItem>
                   
                </NavigationMenuList>
             </NavigationMenu>

        </>
    )
}

export default NavigationBar;