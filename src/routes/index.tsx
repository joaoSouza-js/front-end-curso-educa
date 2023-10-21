import { BrowserRouter, Route,Routes } from 'react-router-dom';
import { SignIn } from '../screens/SignIn';
import { Home } from '../screens/Home';

export function Router() {
  return (

    <BrowserRouter>
        <Routes>
            <Route  path="/" Component={SignIn} />
            <Route path="/home" Component={Home} />
            <Route path="/contact" Component={SignIn} />
        </Routes>
    </BrowserRouter>
  );
}