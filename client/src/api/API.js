import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

instance.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const authApi = ({
  signUp(newCompanyInfo) { return instance.post('auth/signup', newCompanyInfo) },
  signupEmployee(newEmployeeInfo) { return instance.post('auth/signupEmployee', newEmployeeInfo) },
  signIn(formData) { return instance.post('auth/signin', formData) }
})

export const userApi = ({
  getUsers(company) { return instance.get(`users/getusers?company=${company}`) },
  createUser(formData) { return instance.post('users/createuser', formData) },
  updateUser(id, formData) { return instance.post(`users/updateuser/${id}`, formData) },
})

export const taskApi = ({
  createTask(formData) { return instance.post('task/createtask', formData) },
  updateTask(formData, id) { return instance.patch(`task/updatetask/${id}`, formData) },
  getTask(company) { return instance.get(`task/gettasks?company=${company}`) }
})

export const chatApi = ({
  createChat(chatDate) { return instance.post('/chat/createmessage', chatDate) },
  getChat(company) { return instance.get(`/chat/getchat?company=${company}`) }
})
