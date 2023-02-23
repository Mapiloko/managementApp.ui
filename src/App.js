import './App.css';
// import Login from './Components/Login';
import Header from './Components/Header';
import EmployeeList from './Components/EmployeeList';

function App() {
  return (
    <div className='default-background container-fluid'>
      <div className='container'>
        <Header/>
        <EmployeeList/>
      </div>
    </div>
  );
}

export default App;
