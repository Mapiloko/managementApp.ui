const baseURL= "https://localhost:5000/api";


export const createEmployee$ = (body) =>
  fetch(
    `${baseURL}/employee`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

      
      export const getEmployeesData$ = () =>
  fetch(
    `${baseURL}/employee`,
    {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      }
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

export const editEmployee$ = (body, id) =>
  fetch(
    `${baseURL}/employee/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
    `${baseURL}/employee/status/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
    `${baseURL}/employee/editrole/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
      
export const editEmployeeDepartment$ = (body, id) =>
  fetch(
    `${baseURL}/employee/department/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
        