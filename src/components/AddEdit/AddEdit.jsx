import React, { useCallback, useState, useEffect } from 'react'
import '../../utils/Utility.css'
import './AddEdit.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ADD, EDIT } from '../../utils/constants.js'
import {useDropzone} from 'react-dropzone'
import { validateAll, getYears, handleAddEdit, handleDropFiles, getMovie} from '../../utils/movieHelper.js'

const AddEdit = () => {
  //for navigation purpose
  const action = useParams().action
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const updateId = searchParams.get("updateId")

  //input fields
  const [preview, setPreview] = useState(null)
  const [base64Image, setBase64Image] = useState(null)
  const [title, setTitle] = useState("")
  const [year, setYear] = useState(0)

  //For UI error messages
  const [errorElements, setErrorElements] = useState({errTitle: "", errYear: "", errImage: "", apiError: ""})
  const [doUpdateImage, setDoUpdateImage] = useState(false)
  const [loading, setLoading] = useState(false);

// handle on droping image in drop box
  const onDrop = useCallback(acceptedFiles => {
    handleDropFiles(acceptedFiles, setPreview, setBase64Image, setErrorElements, setDoUpdateImage, action)
  }, [action])

  const {getRootProps, getInputProps} = useDropzone({accept: { "image/*": [] },onDrop})

  const [years, setYears] = useState([])

  useEffect(() => {
    
      // Set years dropdown
      setYears(getYears());

      //Authentication logic
  },[])

  useEffect(()=> {
      //set inputs in case of update
      if(action === EDIT) {
        getMovie(updateId, setTitle, setYear, setPreview)
        
      }
  },[action])


  async function handleSubmit() {
    try{
        if(loading) return // if loading return
        setLoading(true)

        // return if inputs not valid
        if(!validateAll(preview, title, year, setErrorElements)) {
          setLoading(false)
          return
        } 

        // edit or add movie and navigate to feed
        if(await handleAddEdit(base64Image, preview, title, year, doUpdateImage, updateId, action)) {
          navigate("/feed")
        } 
        setLoading(false)
    }
    catch(e) {

      setLoading(false)
      setErrorElements(prev => {return {...prev, apiError: "Something went wrong! please try again."}})
    }
  }

  return (
    <div className='container'>
            
    <h1 className='addedit-heading'>
    {action === ADD && "Create a new Movie"}
    {action === EDIT && "Edit"}
    {errorElements.apiError && <p className='error-message'>ERROR : {errorElements.apiError}</p>}
    </h1>
        <div className='addedit-wrapper'>
            {/* dropzone component */}
            
            <div className='grid-item-1' {...getRootProps()}>
                {errorElements.errImage && <p className='error-message'>ERROR : {errorElements.errImage}</p>}
                <input {...getInputProps()} />
                {preview?
                  (<img
                  src={preview}
                  alt={preview}
                  className='image-previw'
                  />)
                
                 : <><i className="bi bi-download"></i><p>drag an image here</p></>
                }
              
            </div>
            {/* Inputs Title and year */}
            <form className='grid-item-2' onSubmit={(e) => e.preventDefault()}>
                <input 
                type="text" 
                placeholder="Title" 
                className={"input-field addedit-title" + (errorElements.errTitle? " input-field-error" : "")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                {errorElements.errTitle && <p className='error-message'>ERROR : {errorElements.errTitle}</p>}
              
              {/* Dropdown for selecting the year */}
              <select value={year} onChange={(e)=> {setYear(parseInt(e.target.value))}} 
              className={"input-field addedit-pub" + (errorElements.errYear? " input-field-error" : "")}
              >
              <option value={0} >Publishing year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {errorElements.errYear && <p className='error-message'>ERROR : {errorElements.errYear}</p>}

            </form>
            {/* Buttons  */}
            <div className='grid-item-3'>
                <button className='btn btn-secondary btn-adedit' onClick={() => navigate("/feed")}>Cancel</button>
                <button className={'btn btn-primary btn-adedit' + (loading? " load-button": "")} onClick={handleSubmit}>Submit</button>
            </div>
                  
        </div>
        
    </div>
  )
}

export default AddEdit