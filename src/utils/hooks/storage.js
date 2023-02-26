export const getFromStore = (key) => {
    const data = sessionStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch(e) {
        return data;
      }
    }
    return null;
  };
  
  export const setToStore = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
  