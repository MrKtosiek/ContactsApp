import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Login } from "./pages/Login";
import { CONTACT_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE as MAIN_PAGE_ROUTE } from "./Constants";
import { ContactDetails } from "./components/ContactDetails";

function App() {
  return <Router>
    <Routes>
      <Route path={MAIN_PAGE_ROUTE} element={<MainPage/>} />
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path={`${CONTACT_ROUTE}/:id`} element={<ContactDetails />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  </Router>;
}

export default App;
