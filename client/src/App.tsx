import { Route, Routes } from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Layout from "./layouts/Layout";
import ManageHoldings from "./features/holdings/ManageHoldings";
import ManageTransactions from "./features/transactions/ManageTransactions";
import Plan from "./features/planning/Plan";

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/manage/holdings" element={<ManageHoldings />} />
          <Route path="/manage/transactions" element={<ManageTransactions />} />
          <Route path="/plan" element={<Plan />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
