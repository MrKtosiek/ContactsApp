import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Login } from "./pages/Login";
import { ADD_CONTACT_ROUTE, CONTACT_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE, REGISTER_ROUTE } from "./Constants";
import { ContactDetails } from "./pages/ContactDetails";
import { AddContact } from "./pages/AddContact";
import { Register } from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={`${CONTACT_ROUTE}/:id`} element={<ContactDetails />} />
        <Route path={ADD_CONTACT_ROUTE} element={<AddContact />} />
        <Route path={MAIN_PAGE_ROUTE} element={<MainPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
