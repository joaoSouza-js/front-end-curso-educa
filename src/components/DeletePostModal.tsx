import * as Dialog from '@radix-ui/react-dialog';
import { DialogPortal } from './DialogPortal';
import { ReactNode, useState } from 'react';
import { usePost } from '../hooks/usePost';
import { AppError } from '../utils/AppErros';

interface DeletePostModalProps {
    children: ReactNode,
    postId: string
}

export function DeletePostModal({children,postId}: DeletePostModalProps){
    const [isDeletingPost, setIsDeletingPost] = useState(false)
    const {deletePost} = usePost()
    
    async function handleDeletePost(){
        try{
            setIsDeletingPost(true)
            await deletePost(postId)
        }
        catch(error){
            const isAppError = error instanceof AppError
            window.alert(isAppError ? error.message : 'Erro ao deletar post')
        }
        finally{
            setIsDeletingPost(false)
        }
    }
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <DialogPortal>
                <div className='flex flex-col items-center '>
                    <Dialog.Title className='text-xl font-medium text-black-800'>
                        Deletar Post
                    </Dialog.Title>
                
                    <Dialog.Description className='mt-2 text-center font-medium'>
                        Tem certeza que deseja <br/> deletar esse post?
                    </Dialog.Description>
                    <div className='mt-4 gap-2 flex'>
                        <Dialog.Close className='px-4 py-2 transition w-32 flex justify-center  rounded-lg border-2 text-zinc-800 border-zinc-800 font-semibold text-sm  hover:border-zinc-900 hover:text-zinc-900'>
                            Cancelar
                        </Dialog.Close>
                        <button 
                            disabled={isDeletingPost}
                            onClick={handleDeletePost}
                            className='bg-red-500 py-2 transition w-32 flex justify-center  px-4 rounded-lg text-white font-semibold text-sm disabled:bg-red-300 disabled:cursor-not-allowed hover:bg-red-600'
                        >
                            Exclúir
                        </button>

                    </div>

                </div>

            </DialogPortal>
        </Dialog.Root>
    )
}