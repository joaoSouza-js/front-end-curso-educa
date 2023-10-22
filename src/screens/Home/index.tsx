import { Header } from "../../components/Header";
import { TextInput } from "../../components/Input";
import { Search,SlidersHorizontal } from "lucide-react";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { usePost } from "../../hooks/usePost";

export function Home(){
    const [isFetchingPost, setIsFetchingPost,] = useState(false)

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
                    <button title="Filtro">
                        <SlidersHorizontal 
                            size={34} 
                            className="text-purple-600 hover:text-purple-800 hover:transition"   
                        />
                    </button>


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