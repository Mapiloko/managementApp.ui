import AuthHeader from "../Services/AuthHeader";

const baseURL= "https://localhost:5000/api";

export const createDepartment$ = (body) =>
  fetch(
    `${baseURL}/department`,
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

export const getDepartmentsData$ = () =>
  fetch(
  `${baseURL}/department`,
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

export const updateDepartment$ = (body, id) =>
  fetch(
    `${baseURL}/department/${id}`,
    {
      method: "PUT",
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


export const updateDepartmentStatus$ = (body, id) =>
  fetch(
    `${baseURL}/department/status/${id}`,
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

export const getDepartmentManager$ = (id) =>
  fetch(
      `${baseURL}/department/manager/${id}`,
      {
        method: "GET",
        headers: AuthHeader(),
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
  
    
