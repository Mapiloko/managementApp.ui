import AuthHeader from "../Services/AuthHeader";

const baseURL= "https://localhost:5000/api/account";

export const Login$ = (body) =>
    fetch(
      `${baseURL}/post/login`,
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
  
   
export const updateRole$ = (body) =>
    fetch(
    `${baseURL}/changerole`,
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
    
     