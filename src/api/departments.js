const baseURL= "https://localhost:5000/api";

export const createDepartment$ = (body) =>
  fetch(
    `${baseURL}/department`,
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

export const getDepartmentsData$ = () =>
  fetch(
  `${baseURL}/department`,
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

export const editDepartment$ = (body, id) =>
  fetch(
    `${baseURL}/department/${id}`,
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


export const editDepartmentStatus$ = (body, id) =>
  fetch(
    `${baseURL}/department/status/${id}`,
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
  
    
