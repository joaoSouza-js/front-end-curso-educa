import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export  function usePost(){
    const context = useContext(PostContext);
    return context;
}