import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useEffect } from "react";
import { DialogPortal } from "./DialogPortal";
import { TextInput } from "./Input";
import { usePost } from "../hooks/usePost";
import * as Select from '@radix-ui/react-select';

interface FilterModalProps extends  Dialog.DialogProps {
    inputValue?: string,
    children: ReactNode,
}

export function FilterModal({children,inputValue}: FilterModalProps){
    const {categories,fetchCategories} = usePost()
    
    async function handlefetchCategories(){
        try {
            await fetchCategories()
        } catch (error) {
            
        }
    }

    useEffect(() => {
        handlefetchCategories()
    }, [])

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <DialogPortal>
                <TextInput.Root>
                    <TextInput.Input defaultValue={0} />

                </TextInput.Root>
            </DialogPortal>
        </Dialog.Root>
    )
}