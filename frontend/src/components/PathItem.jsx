import { useDispatch } from "react-redux"
import {deletePath} from '../features/paths/pathSlice'

function PathItem({path}) {
    const dispatch = useDispatch()
  return (
    <div className="goal">
        {/* <div>
            {new Date(path.createdAt).toLocaleString('en-US')}
        </div> */}
        <div className="goal">

          {/* <img src={path.coverURL} style={{width:70, height:70}}></img> */}
          {/* <h2 style={{paddingLeft:40}}>caat</h2> */}
          {/* <h2 >caat</h2> */}

          <img src={path.coverURL} style={{width:110, paddingRight:20}} align="left" />
          <h2>{path.albumName}
          </h2>
          <h3 style={{paddingBottom:30}}>{path.albumLength}
          </h3>
        </div>

        {path.pathURL.includes('www.google.com/maps') ? <iframe src={path.pathURL} width={600} height={400} style={{margin:20}}></iframe>  : <h3>Invalid path URL</h3> }
        
        {/* <button className="close" onClick={()=>dispatch(deletePath(path._id))}>X</button> */}
        <button className="close" onClick={() => {if(window.confirm('Delete path?')){dispatch(deletePath(path._id))};}}>X</button>
    </div>
  )
}

export default PathItem


{/* <iframe src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d2482.940895888497!2d-0.10020997207105035!3d51.514300321814765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e2!4m3!3m2!1d51.514424999999996!2d-0.1042438!4m5!1s0x487604ab2af44125%3A0x823f35dd88c9b2ce!2s151%20Cheapside%2C%20London%20EC1A%204EU!3m2!1d51.514775799999995!2d-0.09691949999999999!5e0!3m2!1sen!2suk!4v1693297760236!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}