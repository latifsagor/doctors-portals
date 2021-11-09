import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getIdToken,
} from 'firebase/auth'
import firebaseInitialization from '../Pages/Login/Firebase/firebase.init'
import { useEffect, useState } from 'react'

firebaseInitialization()
const useFirebase = () => {
  const [user, setUser] = useState({})
  const auth = getAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [admin, setAdmin] = useState(false)
  const [token, setToken] = useState('')

  // REGISTER NEW USER
  const registerUser = (name, email, password, history) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setAuthError('')
        const newUser = { email, displayName: name }
        setUser(newUser)

        // Save user to the database
        saveUser(email, name, 'POST')

        // Send name to firebase after creation
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {})
        history.push('/')
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(setIsLoading(false))
  }

  // SIGN IN USER
  const logInUser = (email, password, location, history) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const destination = location?.state?.from || '/'
        history?.replace(destination)
        setAuthError('')
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(setIsLoading(false))
  }

  // GOOGLE SIGN IN
  const signInWithGoogle = (location, history) => {
    setIsLoading(true)
    const googleProvider = new GoogleAuthProvider()

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user

        saveUser(user.email, user.displayName, 'PUT')

        setUser(user)
        const destination = location?.state?.from || '/'
        history.replace(destination)
        setAuthError('')
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(setIsLoading(false))
  }

  // Observe State
  const unsubscribe = useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        getIdToken(user).then((idToken) => {
          setToken(idToken)
        })
      } else {
        setUser({})
      }
      setIsLoading(false)
    })
    return () => unsubscribe
  }, [auth])

  useEffect(() => {
    fetch(`https://still-fjord-96598.herokuapp.com/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin))
  }, [user?.email])

  // LogOut
  const logOut = () => {
    setIsLoading(true)
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(setIsLoading(false))
  }

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName }
    fetch('https://still-fjord-96598.herokuapp.com/users', {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return {
    user,
    logOut,
    registerUser,
    logInUser,
    isLoading,
    authError,
    signInWithGoogle,
    admin,
    token,
  }
}

export default useFirebase
