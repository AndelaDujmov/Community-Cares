import { Button } from "@/components/ui/button";


interface NavigationButtonProps {
    text: string
}

const NavigationButton = ({ text }: NavigationButtonProps) => {
    return (
        <>
            <Button>{text}</Button> 
        </>
    )
}

export default NavigationButton;