import { Header } from "../../components/Header";
import { TextInput } from "../../components/Input";
import { Search,SlidersHorizontal } from "lucide-react";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import { usePost } from "../../hooks/usePost";
import { FilterModal } from "../../components/FilterModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const searchSchema = z.object({
    search: z.string().optional()
})

type SearchSchemaType = z.infer<typeof searchSchema>

export function Home(){
    const [isFetchingPost, setIsFetchingPost,] = useState(false)

    const {watch, handleSubmit,register} = useForm<SearchSchemaType>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: ''
        }
    })
    
    const {search} = watch()


    const {fetchPosts,posts} = usePost()

    async function handleFetchPost(){
        setIsFetchingPost(true)
        try {
            await fetchPosts()   
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsFetchingPost(false)
        }
    }

    useEffect(() => {
        handleFetchPost()
    }, [])

    return (
        <div >
            <Header/> 
            
            <div className="px-4 py-5">
                <div className="flex items-center gap-y-2 gap-x-2">
                    <form className="w-full">

                        <TextInput.Root>
                            <TextInput.Input
                                placeholder="Digite o titulo do post"
                                type="text"
                                icon={<Search size={16} />}
                            />
                        </TextInput.Root>
                    </form>
                    <FilterModal inputValue={search} >
                        <button title="Filtro">
                            <SlidersHorizontal 
                                size={34} 
                                className="text-purple-600 hover:text-purple-800 hover:transition"   
                            />
                        </button>

                    </FilterModal>


                </div>
                <main className="flex flex-col gap-4 pt-5">
                    {
                        posts.map(post => (
                            <Card
                                key={post.id}
                                post={post}
                            />
                        ))
                    }
                </main>
            </div>
        </div>
    )
}