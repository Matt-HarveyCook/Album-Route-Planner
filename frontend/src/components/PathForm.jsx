import { useState } from "react"
import { useDispatch } from "react-redux"
import { createPath } from "../features/paths/pathSlice"


function PathForm() {
    const [text, setText] = useState({
        'albumName':'',
        'albumLength':'',
        'pathURL':''
    })

    const dispatch = useDispatch()
    
    const onSubmit = e =>{ 
        e.preventDefault()
        dispatch(createPath(text))
        setText({
        'albumName':'',
        'albumLength':'',
        'pathURL':''
    })
    }
    return (
        <section className="form">
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="text">Album Name</label>
                    {/* <input type="text" id='text' value={text} onChange={(e)=>{setText(e.target.value)}}/> */}
                    <input type="text" id='text' value={text.albumName} onChange={(e)=>{
                        let copy = { ...text, albumName: e.target.value } 
                        setText(copy)
                    }}/>
                </div>

                {/* <div className="form-group">
                    <label htmlFor="text">Album Length</label>
                    <input type="text" id='text' value={text.albumLength} onChange={(e)=>{
                        let copy = { ...text, albumLength: e.target.value }
                        setText(copy)
                    }}/>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Path URL</label>
                    <input type="text" id='text' value={text.pathURL} onChange={(e)=>{
                        let copy = { ...text, pathURL: e.target.value }
                        setText(copy)
                    }}/>
                </div> */}

                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Path
                    </button>
                </div>

            </form>
        </section>
    )
}

export default PathForm