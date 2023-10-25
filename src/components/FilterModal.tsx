import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useEffect, useState } from "react";
import { DialogPortal } from "./DialogPortal";
import { TextInput } from "./Input";

import { SelectCategory } from "./SelectCategory";
import { Button } from "./Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { usePost } from "../hooks/usePost";

interface FilterModalProps extends Dialog.DialogProps {
    inputValue?: string,
    children: ReactNode,
}

const filterSchema = z.object({
    author: z.string().optional(),
    categoryId: z.string().uuid().optional()
})

type FilterSchemaType = z.infer<typeof filterSchema>

export function FilterModal({ children, inputValue,open=false}: FilterModalProps) {
    const [modalIsOpen, setModalIsOpen] = useState(open)
    const { filterPosts } = usePost()

    const { register, handleSubmit, control, formState } = useForm<FilterSchemaType>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            author: inputValue || '',
        },
    })
    const {isSubmitting } = formState
  
    function handleFilter(data: FilterSchemaType){
        filterPosts({
            authorName: data.author || '',
            categoryId: data.categoryId 
        
        })
        setModalIsOpen(false)
    }


    return (
        <Dialog.Root onOpenChange={setModalIsOpen} open={modalIsOpen}>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <DialogPortal>
                <form 
                    onSubmit={handleSubmit(handleFilter)}
                    className="min-h-[200px] pt-4 flex flex-col gap-4"
                >
                    <TextInput.Root>
                        <TextInput.Input
                            {...register('author')}
                            
                            placeholder="Digite o titulo do post"
                            type="text"
                            icon={<Search size={16} />}
                        />


                    </TextInput.Root>
                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field: { onChange, value, } }) => (
                            <SelectCategory
                                onValueChange={onChange}
                                value={value}

                            />
                        )}
                    />
                    <Button disabled={isSubmitting}>
                        Filtrar
                    </Button>

                </form>
            </DialogPortal>
        </Dialog.Root>
    )
}