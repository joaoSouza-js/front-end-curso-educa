import { Button } from "./Button";
import LogoImage from '../assets/pinguin.svg'
import {Plus} from 'lucide-react'
import { CreateNewPostModal } from "./CreateNewPostModal";

export function Header(){
    return (
        <header className="flex justify-center items-center gap-x-4 px-4 py-6 bg-purple-600 ">
            <CreateNewPostModal>
                <Button 
                    type="button"
                    title="Novo Post" 
                    className="h-12 w-12 flex justify-center items-center hover:bg-purple-500"
                >
                    <Plus/>
                </Button>

            </CreateNewPostModal>
      
            <div className="flex flex-1 justify-center gap-x-4 ">
                    <div className="-ml-11 flex">
                        <h1 className="text-2xl font-medium text-center text-white">QUICK POST </h1>
                        <img src={LogoImage} className="h-7 w-7"  />

                    </div>
            </div>
        </header>
    )
}