import {useState, useEffect} from 'react'
import {FaSign, FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {

    // Creates a state which stores the values of the form and sets it accessable through variables
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData

    // Makes a navigate object - this is used for redirecting to other pages within react
    const navigate = useNavigate()

    // Make a dispatch object - the way actions are called on the store
    const dispatch = useDispatch()

    // Used for pulling values out of the redux store for use within this component
    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth)


    // Effect hook is for performing any action which isnt returning jsx
    // Determines if there is any issues and if not then go to the dashboard
    // It then calls the reset function on the store which returns the auth state to defaults
    // The second parameter are the requirements for this effect to take place
    useEffect(() => {
        if (isError) {
        // Toast is for displaying pop ups
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])

    // Ensures that what is typed into form is displayed
    // This is because the form input is stored in the state and then this assigns the value of the form from the state
    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState, [e.target.name]: e.target.value,
        }))
    }


    // Passes the form values into the login function and calls it using dispatch
    const onSubmit = (e)=>{
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    // Displays loading symbol while loading
    if(isLoading){
        return <Spinner/>
    }

  return (
        <div className="background"> 
        <section className='heading'>
            <h1 >
               <FaSignInAlt/> Sign In
                <p>Login and start setting goals</p>
            </h1>    
        </section> 

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />

                </div>
                <div className="form-group">
                    <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange} />

                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
        </div>
  )
}

export default Login