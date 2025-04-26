import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Login } from "./pages/Login";
import { LOGIN_ROUTE, MAIN_MENU_ROUTE as MAIN_PAGE_ROUTE } from "./Constants";

function App() {
  return <Router>
    <Routes>
      <Route path={MAIN_PAGE_ROUTE} element={<MainPage/>} />
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  </Router>;
}

export default App;
