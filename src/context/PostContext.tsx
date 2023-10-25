import { ReactNode, createContext, useState } from "react";
import api from "../services/api";
import { AppError } from "../utils/AppErros";
import { AxiosError } from "axios";

interface PostContextProps {
    posts: POST_DTO[]
    fetchPosts: () => Promise<void>
    createPost: (post: POST_DTO_CREATE) => Promise<void>
    deletePost: (id: string) => Promise<void>,
    categories: CategoryDTO[],
    fetchCategories: () => Promise<void>
}

export const PostContext = createContext({} as PostContextProps);

interface PostContextProviderProps {
    children: ReactNode
}

export function PostContextProvider({children}: PostContextProviderProps){
    const [posts, setPosts] = useState<POST_DTO[]>([])
    const [categories, setCategories] = useState<CategoryDTO[]>([])

    async function fetchPosts(){
        try {
            const response = await api.get<POST_DTO[]>('/posts')
            setPosts(response.data)
            
        } catch (error) {
            const isAxiosError = error instanceof AxiosError

            if(isAxiosError){
                throw new AppError(error.response?.data.message, error.status)
            }
            throw error
        }

    }
    

    async function createPost(post: POST_DTO_CREATE){
        const {title, content,categoryId,schedule} = post

        try {
            const response = await api.post<POST_DTO>('/posts', {
                title,
                content,
                categoryId,
                schedule
            })
            setPosts([...posts, response.data])
            
        } catch (error) {
            const isAxiosError = error instanceof AxiosError

            if(isAxiosError){
                throw new AppError(error.response?.data.message, error.status)
            }
            throw error
        }
    }

    async function deletePost(id: string){
        try {
            await api.delete(`/posts/${id}`)
            const postWithoutOnePost = posts.filter(post => post.id !== id)
            setPosts(postWithoutOnePost)
            
        } catch (error) {
            const isAxiosError = error instanceof AxiosError

            if(isAxiosError){
                throw new AppError(error.response?.data.message, error.status)
            }
            throw error
        }
    }

    async function fetchCategories(){
        try {
            const response = await api.get<CategoryDTO[]>('/categories')
            setCategories(response.data)
            
        } catch (error) {
            const isAxiosError = error instanceof AxiosError

            if(isAxiosError){
                throw new AppError(error.response?.data.message, error.status)
            }
            throw error
        }
    }

    return (
        <PostContext.Provider 
            value={{
                categories,
                fetchCategories,
                posts,
                fetchPosts,
                createPost,
                deletePost
            }}
        >
            {children}
        </PostContext.Provider>
    )
}

