import './App.css';
// import Login from './Components/Login';
import Header from './Components/Header';
import EmployeeList from './Components/EmployeeList';
import DepartmentList from './Components/DepartmentList';
import EntityCreate from './Components/EntityCreation';

function App() {
  return (
    <div className='default-background container-fluid'>
      <div className='container'>
        <Header/>
        <EntityCreate name="Employee"/>
      </div>
    </div>
  );
}

export default App;
