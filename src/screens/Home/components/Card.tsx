import { ComponentProps } from 'react';
import { tv } from "tailwind-variants";
import { Trash2 } from 'lucide-react';
import { Button } from '../../../components/Button';
import { DeletePostModal } from '../../../components/DeletePostModal';

interface CardProps extends ComponentProps<'div'> {
    post: POST_DTO
}

export function Card({post,className, ...rest}:CardProps){
    const {category,content,title} = post
    return (
        <div
            className='bg-gray-100 rounded-lg shadow-inner flex min-h-[208px] max-h-[408px] flex-col px-4 gap-y-4 py-6'
            {...rest}
        >
            <header className='flex justify-between items-center'>
                <h2 className='text-xl pr-4'>
                    {title}
                </h2>
                <Button className='bg-purple-400 w-auto px-3 text-xs h-auto     py-2  rounded-2xl'>
                    {category}
                </Button>
            </header>

                <div className='overflow-auto text-sm'  dangerouslySetInnerHTML={{ __html: content }}/>

                
            {
                post.owner && (
                    <DeletePostModal postId={post.id}>
                        <button type='button' className='self-end'>
                            <Trash2 size={24} />
                        </button>
                    </DeletePostModal>

                )
            }
             

        </div>
    )
}