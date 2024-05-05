import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import module from './ScrollList.module.css'
import { FaArrowUp, FaPencilAlt, FaTrash } from "react-icons/fa"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"

interface ScrollListProps {
    objectList: any,
    admin: boolean
}


const ScrollList = ({ objectList, admin } : ScrollListProps) => {
    const handleDelete = (id) => {
        axios
        .delete(`http://localhost:3001/organisations/${id}`)
        .then(rez => {
            toast({
                title: "Izbrisano!"
              })
        })
    }

    const handlePublish = (id) => {
        axios
        .patch(`http://localhost:3001/organisations/${id}`, 
            {
                odobreno: true
            }
        )
        .then(rez => {
            toast({
                title: "Uspješno dodano!"
              })
        })
    }

    return (
        <>
            <ScrollArea className="h-72 w-full rounded-md border overflow-y-auto" id={module.scroller}>
            <div className="p-4" >
                {objectList.map((tag) => (
                <>
                     <div key={tag} className={`${module.main} flex justify-between items-center`}>
                        <div className={`text-sm ${module.element}`}>
                            {tag.ime}
                        </div>
                       {(
                         <div className={module.buttons}>
                         {tag.odobreno && (
                          <>
                              <button className={module.reject} onClick={() => handleDelete(tag.id)}><FaTrash /></button>
                              <button className={module.accept}><FaPencilAlt /></button>
                          </>
                         )}

                          {!tag.odobreno && (
                          <>
                              <button className={module.reject} onClick={() => handleDelete(tag.id)}><FaTrash /></button>
                              <button className={module.accept} onClick={() => handlePublish(tag.id)}><FaArrowUp /></button>
                          </>
                           
                         )}
                      </div>
                       )}
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