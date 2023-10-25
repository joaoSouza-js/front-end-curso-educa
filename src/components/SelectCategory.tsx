import * as Select from '@radix-ui/react-select';

import { useEffect, useState } from 'react';
import { usePost } from '../hooks/usePost';
import { AppError } from '../utils/AppErros';


interface SelectCategoryProps extends Select.SelectProps {

}

export function SelectCategory(props: SelectCategoryProps) {
    const [isFetchingCategories, setIsFechingCategories] = useState(false)

    const { categories, fetchCategories } = usePost()

    async function handleFetchCategories() {
        try {
            setIsFechingCategories(true)
            await fetchCategories()
        }
        catch (error) {
            const isAppError = error instanceof AppError
            window.alert(isAppError ? error.message : 'Erro no Servidor, tente novamente mais tarde')
        }
        finally {
            setIsFechingCategories(false)
        }
    }

    useEffect(() => {
        handleFetchCategories()
    }, [])
    return (
        <Select.Root {...props}>
            <Select.Trigger
                className='p-4 flex justify-between border border-gray-300 rounded-md w-full'
                aria-label="selecione uma categoria"
            >
                <Select.Value placeholder="Selecione uma Categoria" />
                <Select.Icon className="text-violet11">


                </Select.Icon>
            </Select.Trigger>

            <Select.Content position='popper' className="overflow-hidden w-[90vw] max-w-[386px]  bg-white z-20 border-gray-300 rounded-md border   ">
                <Select.Viewport className=" w-full max-h-[246px]">
                    {
                        categories.map(category => (
                            <Select.Item 
                                key={category.id} 
                                className='bg-white py-4 px-2 rounded-md ' 
                                value={category.id}
                            >
                                <Select.ItemText>
                                    {category.name}
                                </Select.ItemText>
                            </Select.Item>
                        ))
                    }


                </Select.Viewport>
            </Select.Content>
        </Select.Root>

    )
}