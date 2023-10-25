import * as Dialog from '@radix-ui/react-dialog';
import { DialogPortal } from './DialogPortal';
import { ReactNode, useState } from 'react';
import { usePost } from '../hooks/usePost';
import { AppError } from '../utils/AppErros';
import { Button } from './Button';

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
                     <Dialog.Close asChild>
                            <Button variant='withoutBackground' className='w-32 h-auto'>
                                Cancelar
                            </Button>

                        </Dialog.Close>
                   
                       
                        <Button 
                            variant='danger' 
                            className='w-32 h-auto'
                            onClick={handleDeletePost}
                        >
                            Exclúir
                        </Button>
                     

                    </div>

                </div>

            </DialogPortal>
        </Dialog.Root>
    )
}