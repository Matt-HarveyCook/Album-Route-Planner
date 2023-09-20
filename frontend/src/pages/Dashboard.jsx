import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from "../components/GoalForm"
import PathForm from "../components/PathForm"
import Spinner from '../components/Spinner'
import {getGoals, reset} from '../features/goals/goalSlice'
import GoalItem from "../components/GoalItem"
import PathItem from "../components/PathItem"
import { getPaths, resetPath } from "../features/paths/pathSlice"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.auth)
  // const {goals, isLoading, isError, message} = useSelector((state)=>state.goals)
  const {paths, isLoading, isError, message} = useSelector((state)=>state.paths)

  
  
  useEffect(()=>{
    if(isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getGoals())
    dispatch(getPaths())

    return () => {
      dispatch(reset())
      dispatch(resetPath())
    }

  }, [user, navigate, isError, message, dispatch])

  if(isLoading){
    <Spinner/>
  }

  return (
    <div className="background"> 
    <section className="heading">
      <h1 style={{paddingTop:40}}>Welcome {user && user.name}</h1>
      {/* <p>Goals Dashboard</p> */}
      <h3>Goals Dashboard</h3>

    </section>
    {/* <GoalForm/> */}
    <PathForm/>
    {/* <section className="content">
        <div className="goals">
            <PathItem albumName='Kids See Ghosts' albumLength='23:52' pathURL='https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d9930.356834609905!2d-0.32053456495890525!3d51.520752050733535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x4876120a745961ad%3A0x9207ed0f81ac44ba!2sEaling%20Broadway%2C%20New%20Ealing%20Broadway%2C%20London!3m2!1d51.514719299999996!2d-0.3016676!4m5!1s0x4876126ce2716b2d%3A0x858a71563c55bab7!2sLudlow%20Rd%2C%20London%20W5%201NX!3m2!1d51.527789899999995!2d-0.30806!5e0!3m2!1sen!2suk!4v1693217352623!5m2!1sen!2suk'/>
            <PathItem albumName='Alfredo' albumLength='32:02' pathURL='https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d9930.356834609905!2d-0.32053456495890525!3d51.520752050733535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x4876120a745961ad%3A0x9207ed0f81ac44ba!2sEaling%20Broadway%2C%20New%20Ealing%20Broadway%2C%20London!3m2!1d51.514719299999996!2d-0.3016676!4m5!1s0x4876126ce2716b2d%3A0x858a71563c55bab7!2sLudlow%20Rd%2C%20London%20W5%201NX!3m2!1d51.527789899999995!2d-0.30806!5e0!3m2!1sen!2suk!4v1693217352623!5m2!1sen!2suk'/>
            <PathItem albumName='To Pimp A Butterfly' albumLength='73:10' pathURL='https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d9930.356834609905!2d-0.32053456495890525!3d51.520752050733535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x4876120a745961ad%3A0x9207ed0f81ac44ba!2sEaling%20Broadway%2C%20New%20Ealing%20Broadway%2C%20London!3m2!1d51.514719299999996!2d-0.3016676!4m5!1s0x4876126ce2716b2d%3A0x858a71563c55bab7!2sLudlow%20Rd%2C%20London%20W5%201NX!3m2!1d51.527789899999995!2d-0.30806!5e0!3m2!1sen!2suk!4v1693217352623!5m2!1sen!2suk'/>
        </div>
    </section> */}

    <section className="content">
      {paths.length > 0 ? (
        <div className="goals">
          {paths.map((path)=>(
            <PathItem path={path} />
          ))}
        </div>
      ) : (<h3>No Paths Added Yet</h3>)}
    </section>

    {/* <section className="content">
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal)=>(
            <GoalItem key={goal._id} goal={goal}/>
          ))}
        </div>
      ) : (<h3>No Goals Added Yet</h3>)}
    </section> */}


    </div>
  )
}

export default Dashboard


