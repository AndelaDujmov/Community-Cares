import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import module from './ScrollList.module.css'

interface ScrollListProps {
    objectList: any
}

const ScrollList = ({ objectList } : ScrollListProps) => {
    return (
        <>
            <ScrollArea className="h-72 w-full rounded-md border overflow-y-auto" id={module.scroller}>
            <div className="p-4" >
                {objectList.map((tag) => (
                <>
                    <div key={tag} className="text-sm" id={module.element}>
                    {tag.ime}
                    </div>
                    <Separator className="my-2" />
                </>
                ))}
            </div>
            </ScrollArea>
        </>
    )
}

export default ScrollList;