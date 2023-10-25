
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";
import { DialogPortal } from "./DialogPortal";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button } from "./Button";
import { usePost } from "../hooks/usePost";
import { AppError } from "../utils/AppErros";
import { SelectCategory } from "./SelectCategory";
import { TextInput } from "./Input";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateNewPostModalProps extends Dialog.DialogProps {
    children: ReactNode,
}

const createNewPostSchema = z.object({
    title: z.string({ required_error: "Digite o Titulo do Post" }).min(5, 'O título deve ter no mínimo 5 caracteres').max(200, 'O título deve ter no máximo 200 caracteres'),
    content: z.string({ required_error: "O conteúdo não pode fiacar vazio" }).min(5, 'O conteúdo deve ter no mínimo 5 caracteres').max(500, 'O conteúdo deve ter no máximo 500 caracteres'),
    categoryId: z.string().uuid('Categoria inválida'),
    scheduledTo: z.coerce.date().optional()
})

type CreateNewPostSchemaType = z.infer<typeof createNewPostSchema>

export function CreateNewPostModal({ children, open = false, ...rest }: CreateNewPostModalProps) {
    const [modalIsOpen, setModalIsOpen] = useState(open)

    const { createPost } = usePost()
    const { control, formState, handleSubmit, register, reset } = useForm<CreateNewPostSchemaType>({
        resolver: zodResolver(createNewPostSchema),
        defaultValues: {
            scheduledTo: new Date()
        }
    })

    const { errors, isSubmitting } = formState

    async function handleCreateNewPost(data: CreateNewPostSchemaType) {
        try {
            const { title, content, categoryId, scheduledTo } = data
            await createPost({
                title,
                content,
                categoryId,
                schedule: scheduledTo
            })
            setModalIsOpen(false)

        } catch (error) {
            const isAppError = error instanceof AppError
            window.alert(isAppError ? error.message : 'Erro ao criar post')
        }
        console.log(data)
        reset()
    }

    return (
        <Dialog.Root onOpenChange={setModalIsOpen} open={modalIsOpen} {...rest} >
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <DialogPortal>
                <div className='flex  flex-col items-center overflow-auto max-h-screen '>
                    <Dialog.Title className='text-xl font-medium text-black-800'>
                        Criar novo post
                    </Dialog.Title>
                    <form onSubmit={handleSubmit(handleCreateNewPost)}>
                        <div className="flex gap-5 mt-4 flex-col">
                            <TextInput.Root>
                                <TextInput.Input
                                    type="text"
                                    placeholder="Título"
                                    {...register('title')}
                                />
                                {
                                    errors.title && <TextInput.Error>{errors.title.message}</TextInput.Error>
                                }
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

                            <Controller
                                control={control}
                                name="content"
                                render={({ field: { onChange, value, } }) => (
                                    <div>
                                        <ReactQuill
                                            value={value} onChange={onChange}
                                            className="h-full  w-full z-0"

                                            theme="snow"
                                        />
                                        {
                                            errors.content && <TextInput.Error>{errors.content.message}</TextInput.Error>
                                        }
                                    </div>
                                )}
                            />

                            <TextInput.Root>
                                <TextInput.Input
                                    type="datetime-local"

                                    placeholder="Agende seu post"
                                    {...register('scheduledTo')}
                                />
                                {
                                    errors.scheduledTo && <TextInput.Error>{errors.scheduledTo.message}</TextInput.Error>
                                }
                            </TextInput.Root>

                        </div>

                        <div className='mt-6 gap-2 flex  w-full'>
                            <Dialog.Close asChild>

                                <Button
                                    variant='danger'
                                    className='flex-grow flex  h-auto'
                                    onClick={() => { }}
                                >
                                    cancelar
                                </Button>
                            </Dialog.Close>

                            <Button
                                variant='withoutBackground'
                                className='flex-grow h-auto'
                                disabled={isSubmitting}
                                onClick={() => { }}
                            >
                                Salvar
                            </Button>

                        </div>

                    </form>

                </div>

            </DialogPortal>
        </Dialog.Root>
    )
}