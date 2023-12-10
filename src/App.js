import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import InvoiceList from './components/InvoiceList/InvoiceList';
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import InvoiceItems from "./components/InvoiceItems/InvoiceItems";
import ItemForm from "./components/ItemForm/ItemForm";
import SignUp from './components/UserSignUp/usersignup';
import Login from './components/UserLogin/userLogin';
import ProtectedRoute from './protected routes/Protectedroutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/invoices/' element={<ProtectedRoute Component={ InvoiceList}/>}/>
       
        <Route path='/invoices/new/' element={<ProtectedRoute Component={InvoiceForm }/>}/>
        
        <Route path='/invoices/:id/' element={<ProtectedRoute Component={InvoiceItems }/>}/>
   
        <Route path='/invoices/:id/items/' element={<ProtectedRoute Component={ItemForm} />}/>
  
        <Route path='/user/signup/' element={<SignUp />}></Route>
        <Route path='/user/login/' element={<Login />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
