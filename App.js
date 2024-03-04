import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NN from './code/404';
import Home from './code/home';
import Login from './code/login';
import Make from './code/offering/make';
import Register from './code/register';
import Add from './code/addstore';
import Subd from './subdomain/subd';
import Admin from './subdomain/admin';
import ProdS from './subdomain/productsub';
import Dashb from './subdomain/dashboard';
function App() {
  if (window.location.host.split(".")[0] != "bunkerz") {
        return (
          <BrowserRouter>
           <Routes>
            <Route path="/" >
            <Route index element={<Subd />} />
            <Route path="/dashboard/:jid/sid/:sid" element={<Dashb />} />
            <Route path="/admin/:jid/sid/:sid" element={<Admin />} />
            <Route path="/product/:jid/sid/:sid" element={<ProdS />} />
            <Route path="*" element={<NN />} />
            </Route>
            </Routes>
          </BrowserRouter>
        );
      }
    else{
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" >
            <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="make" element={<Make />} />
              <Route path="add" element={<Add />} />
              <Route path="*" element={<NN />} />
            </Route>
          </Routes>
        </BrowserRouter>
      );
    }

}

export default App;
