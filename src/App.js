import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthProvider from "./Context/AuthProvider";
import Singin from "./Pages/Authentication/Singin/Singin";
import Singup from "./Pages/Authentication/Singup/Singup";
import DescriptionAdmin from "./Pages/DescriptionAdmin/DescriptionAdmin";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import AdminRoute from './Pages/AdminRoute/AdminRoute';
import Description from "./Pages/Description/Description";
import Home from './Pages/Home/Home';
import SingleUser from './Pages/DescriptionAdmin/SingleUser'
import AdminAllTask from "./Pages/AdminAllTask/AdminAllTask";
import SingleRoute from './Pages/SingleRoute/SingleRoute';
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Singin />} />
            <Route path="/home" element={<Home />} />
            <Route path="singin" element={<Singin />} />
            <Route path="singup" element={<Singup />} />
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <DescriptionAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="admin/settask"
              element={
                <AdminRoute>
                  <SingleUser />
                </AdminRoute>
              }
            />
            <Route
              path="admin/alltask"
              element={
                <AdminRoute>
                  <AdminAllTask/>
                </AdminRoute>
              }
            />
            <Route
              path="admin/alltask/single/:id"
              element={
                <AdminRoute>
                  <SingleRoute/>
                </AdminRoute>
              }
            />
            <Route
              path="user"
              element={
                <PrivateRoute>
                  <Description />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
