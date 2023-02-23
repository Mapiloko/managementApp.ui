const baseURL= "https://core.devinternal.carscan.ai​​";

export const UpdateInputApi$ = (
  url,
  body,
  sessionid
) =>
  fetch(
    `${url}`,
    {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "sessionid": sessionid
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
