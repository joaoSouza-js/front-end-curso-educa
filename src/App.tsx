
import { AuthContextProvider } from "./context/AuthContext";
import { PostContextProvider } from "./context/PostContext";
import { Router } from "./routes";

export function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router/>
      </PostContextProvider>
    </AuthContextProvider>
  );
}