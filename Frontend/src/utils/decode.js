import { jwtDecode } from "jwt-decode";
import { getToken } from "./auth";
const token=getToken();
const decodedHeader = jwtDecode(token, { header: true });
console.log(decodedHeader);