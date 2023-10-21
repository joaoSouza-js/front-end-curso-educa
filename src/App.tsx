
import { AuthContextProvider } from "./context/AuthContext";
import { Router } from "./routes";

export function App() {
  return (
    <AuthContextProvider>
      <Router/>

    </AuthContextProvider>
  );
}