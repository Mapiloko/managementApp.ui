import AuthHeader from "../Services/AuthHeader";

const baseURL= "https://localhost:5000/api/employee";


export const createEmployee$ = (body) =>
  fetch(
    `${baseURL}/create`,
    {
      method: "POST",
      headers: AuthHeader(),
      body: JSON.stringify(body)
    }
  )
    .then((res) => {
      if (res.status === 200 || res.status === 204 || res.status === 201)
        return res;
      else throw new Error(res.status);
    })
    .catch((err) => {
      throw new Error(err);
    });


export const getEmployeesData$ = () =>
  fetch(
    `${baseURL}`,
    {
      method: "GET", // or 'PUT'
      headers: AuthHeader()
    }
  )
    .then((res) => {
      if (res.status === 200 || res.status === 204 || res.status === 201)
        return res;
      else throw new Error(res.status);
    })
    .catch((err) => {
      throw new Error(err);
    });

export const updateEmployee$ = (body, id) =>
  fetch(
    `${baseURL}/${id}`,
    {
      method: "PUT",
      headers: AuthHeader(),
      body: JSON.stringify(body),
    } 
  )
    .then((res) => {
      if (res.status === 200 || res.status === 204 || res.status === 201)
        return res;
      else throw new Error(res.status);
    })
    .catch((err) => {
      throw new Error(err);
    });

 export const editEmployeeStatus$ = (body, id) =>
  fetch(
    `${baseURL}/status/${id}`,
    {
      method: "PUT",
      headers: AuthHeader(),
      body: JSON.stringify(body),
    } 
  )
    .then((res) => {
      if (res.status === 200 || res.status === 204 || res.status === 201)
        return res;
      else throw new Error(res.status);
    })
    .catch((err) => {
      throw new Error(err);
    });

export const editEmployeeRole$ = (body, id) =>
  fetch(
    `${baseURL}/editrole/${id}`,
    {
      method: "PUT",
      headers: AuthHeader(),
      body: JSON.stringify(body),
    } 
  )
    .then((res) => {
      if (res.status === 200 || res.status === 204 || res.status === 201)
        return res;
      else throw new Error(res.status);
    })
    .catch((err) => {
      throw new Error(err);
    });
      
export const updateEmployeeDepartment = (body, id) =>
  fetch(
    `${baseURL}/edit/department/${id}`,
    {
      method: "PUT",
      headers: AuthHeader(),
      body: JSON.stringify(body),
    } 
  )
    .then((res) => {
      if (res.status === 200 || res.status === 204 || res.status === 201)
        return res;
      else throw new Error(res.status);
    })
    .catch((err) => {
      throw new Error(err);
    });
        