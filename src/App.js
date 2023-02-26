import './App.css';
import Login from './Components/Login';
// import Header from './Components/Header';
import EmployeeList, { dataLoader } from './Components/EmployeeList';
import DepartmentList from './Components/DepartmentList';
import EntityCreate from './Components/EntityCreation';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';

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
      <Route path="employees-list" element={<EmployeeList/>} loader={dataLoader} />
      <Route path="department-list" element={<DepartmentList/>} />
      <Route path="/:category/:subCat" element={<EntityCreate/>} />
      <Route path="/:category/:subCat/:id" element={<EntityCreate/>} />
      <Route element={<Login/>} />
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
