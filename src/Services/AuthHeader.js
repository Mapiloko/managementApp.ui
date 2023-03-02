import { getFromStore } from "../utils/hooks/storage";

export default function AuthHeader() 
  {
    let token = getFromStore("Token");
    if (token) {
      return { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', 'Accept': 'application/json'};
    } else {
      return {};
    }
  }