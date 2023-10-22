
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface ModalProps {
    children: ReactNode
}

export function DialogPortal({children}: ModalProps ){
    return (
        <Dialog.Portal >
        <Dialog.Overlay className="bg-gray-500/80 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
        <Dialog.Content  className="flex flex-col p-8 py-8  data-[state=open]:animate-contentShow max-h-[90vh] overflow-auto fixed top-[50%] left-[50%]  w-[90vw]  max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-10">
 
          <Dialog.Close aria-label='close' className='self-end'>
              <X size={23} className='text-gray-500 w-5 h-5'/>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    )
}