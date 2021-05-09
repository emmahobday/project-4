function setToken(token) {
  localStorage.setItem('token', token)
}

function setName(name) {
  localStorage.setItem('name', name)
}

function getName() {
  return localStorage.getItem('name')
}

function isLoggedIn() {
  return !!localStorage.getItem('token')
}


function getToken() {
  return localStorage.getItem('token')
}

function getPayload() {
  const token = this.getToken() //why do we need "this."
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
}

function isAuthenticated() {
  const payload = this.getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp //will return true if token is still valid and false if not 
}


function logout() {
  localStorage.removeItem('token')
}

function getUserId() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  return JSON.parse(atob(parts[1])).sub
}

export default {
  setToken,
  setName,
  isLoggedIn,
  getToken,
  getName,
  getUserId,
  logout,
  getPayload,
  isAuthenticated
}