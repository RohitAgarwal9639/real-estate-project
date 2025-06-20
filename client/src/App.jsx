import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Header from './Components/Header';
import Home from './pages/Home';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import PrivateRoute from './Components/privateRoute';


export default function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/sign-in" element={<Signin/>} />
    <Route path="/sign-up" element={<SignUp/>} />
    <Route path="/about" element={<About/>} />
    <Route  element={<PrivateRoute/>} >
    <Route path="/profile" element={<Profile/>} />
    </Route>
  </Routes>  
  </BrowserRouter>;
}
