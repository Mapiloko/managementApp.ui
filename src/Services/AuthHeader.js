import { getFromStore } from "../utils/hooks/storage";

export default function AuthHeader() 
  {
    let user = getFromStore("User");
    if (user) {
      return { Authorization: 'Bearer ' + user.Token, 'Content-Type': 'application/json', 'Accept': 'application/json'};
    } else {
      return {};
    }
  }