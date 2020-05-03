import axios from "axios";
export type ApiContainerState = {
  username: string;
  password: string;
};

export const authCall = async (user: string, pass: string) => {
  console.log(user, pass);
  try {
    const resp = await axios.get("http://localhost:3000/login", {
      headers: { emailId: user, passWord: pass }
    });
    console.log(resp);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const registerCall = async (
  emailId: string,
  passWord: string,
  userName: string
) => {
  try {
    const resp = await axios.post("http://localhost:3000/register", {
      emailId,
      passWord,
      userName
    });
    console.log(resp);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
