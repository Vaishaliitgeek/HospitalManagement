export const setToken = (token) => {
  localStorage.setItem('token', token);
};
export const setAdminaccessToken = (token) => {
  localStorage.setItem('Admin', token);
};
export const getAdminaccessToken=()=>{
  return localStorage.getItem('Admin');
}

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
export const removeAdminaccessToken = () => {
  localStorage.removeItem('Admin');
};
export const setRole = (role) => {
  localStorage.setRole('role', role);
};
export const getRole = () => {
  return localStorage.getItem('role');
};

export const setuserInfo=(user)=>{
  return localStorage.setItem("user",JSON.stringify(user))
}

export const getuserInfo=()=>{
  return JSON.parse(localStorage.getItem('user'));
}
// export const setAdminDoctor=()=>{
// return localStorage.setItem('adminDoctor',true);
// }