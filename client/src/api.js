import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  // console.error(err)
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

  getUserSync() {
    return JSON.parse(localStorage.getItem('user'))
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        // localStorage.setItem('user', JSON.stringify(res.data))
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
    .then(res => {
      let user = res.data
      localStorage.setItem('user', JSON.stringify(user))
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
  
  editItem(id, data) {
    return service
    .post(`/items/${id}/edit`, data)
    .then(res => res.data)
    .catch(errHandler)
  },
  
  requestItem(id, pickedDays){
    let currentUserId = JSON.parse(localStorage.getItem('user'))._id
    return service
    .post(`/items/${id}/request/${currentUserId}/`, pickedDays)
    .then(res => res.data)
    .catch(errHandler)
  },

  acceptRequest(requestId){
    return service
      .get(`items/request/${requestId}/accept`)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteItem(id){
    return service
    .get(`/items/${id}/delete`)
    .then(res => res.data)
    .catch(errHandler)
  },
  
  addItemPicture(file, id) {
    const formData = new FormData()
    formData.append("picture", file);
    return service
      .post(`/items/${id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
  //====================
  //User routes
  //====================

  // getUser() {
  //   return service
  //   .get(`/users/${JSON.parse(localStorage.getItem('user'))._id}`)
  //   .then(res => 
  //     res.data)
  //   .catch(errHandler)
  // },

  getProfile(){
    return service
      .get(`/users/profile`)
      .then(res => res.data)
      .catch(errHandler)
  },

  editUser(id, data) {
    return service
    .post(`/users/${id}/edit`, data)
    .then(res => res.data)
    .catch(errHandler)
  },

  deleteUser(id){
    return service
    .get(`/users/${id}/delete`)
    .then(res => res.data)
    .catch(errHandler)
  },


  addUserPicture(file, id) {
    const formData = new FormData();
    formData.append("picture", file)
    console.log('DEBUG formData', formData.get("picture"));
    return service
      .post(`/users/${id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },

   //====================
  //Request route
  //====================

  getRequests() {
    return service
      .get('/requests')
      .then(res => res.data)
      .catch(errHandler)
  },
}


