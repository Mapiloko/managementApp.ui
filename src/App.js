import './App.css';
import Login from './Components/Login';
// import Header from './Components/Header';
import EmployeeList, { dataLoader } from './Components/EmployeeList';
import DepartmentList from './Components/DepartmentList';
import EntityCreate from './Components/EntityCreation';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';
import ProtectedRoutes from './utils/hooks/ProtectedRoutes/ProtectedRoutes';
import AdminRoutes from './utils/hooks/ProtectedRoutes/AdminRoutes';

const Root = () =>{
  return (
    <>
      {/* <Header/> */}
      <Outlet/>
    </>
  )
} 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Login/>} />
      <Route element={<ProtectedRoutes /> } >
        <Route path="employees-list" element={<EmployeeList/>} loader={dataLoader} />
        <Route path="department-list" element={<DepartmentList/>} />
        <Route element={<AdminRoutes/> }>
          <Route path="/:category/:subCat" element={<EntityCreate/>} />
        </Route>
        <Route path="/:category/:subCat/:id" element={<EntityCreate/>} />
      </Route>
      {/* <Route element={<Login/>} /> */}
    </Route>
  ))

export default function App() {

  return (
    <div className='default-background container-fluid'>
      <div className='container'>
        {/* <Header/> */}
        <RouterProvider router={router}/>
        {/* <EntityCreate name="Employee"/> */}
      </div>
    </div>
  );
}

// export default App;
