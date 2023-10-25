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




export function Home(){
    const [isFetchingPost, setIsFetchingPost,] = useState(false)
    const [search, setSearch] = useState('')
    const {filterPosts,listFiltredPosts,fetchPosts} = usePost()

    function handleFilter(value: string){
        setSearch(value)
        filterPosts({
            authorName: search || ''
        })
        
    }

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
            
            <div className="px-4 py-5   max-w-[700px] flex mx-auto flex-col items-center ">
                <div className="flex items-center gap-y-2 gap-x-2 w-full">
                    <form 
                        className="w-full"
                       
                    >
                        <TextInput.Root>                      
                            <TextInput.Input
                                placeholder="Digite o Nome do autor"
                                type="text"
                                icon={<Search size={16} />}
                                value={search}
                                onChange={event => handleFilter(event.target.value)}
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
                        listFiltredPosts.map(post => (
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