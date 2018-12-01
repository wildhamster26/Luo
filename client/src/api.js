import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}
 

export default {
  service: service,
  //====================
  //Login/Signup routes
  //====================
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
      })
      .catch(errHandler)
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  sendConfirmation(confirmationCode){
    return service
    .get(`/confirm/${confirmationCode}`)
    .then(user => {
      return user;
    })
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },


  //====================
  //Item routes
  //====================


  getItems() {
    return service
      .get('/items')
      .then(res => res.data)
      .catch(errHandler)
  },

  getItemById(id) {
    return service
      .get(`/items/${id}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  addItem(data) {
    return service
      .post('/items', data)
      .then(res => res.data)
      .catch(errHandler)
  },
  
  editItem(id) {
    return service
    .post(`/items/${id}/edit`)
    .then(res => res.data)
    .catch(errHandler)
  },
  
  requestItem(id){
    return service
    .get(`/items/${id}/request/${JSON.parse(localStorage.getItem('user'))._id}`)
    .then(res => res.data)
    .catch(errHandler)
  },

  deleteItem(){

  },

  //====================
  //User routes --- to be set
  //====================

  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler)
  },

  addPicture(file) {
    const formData = new FormData()
    formData.append("picture", file)
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}
