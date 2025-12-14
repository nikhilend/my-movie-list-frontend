import { EDIT, FETCH_URL } from "./constants";

// converts droped file in drop zone to base 64 for saving in cloudinary
  export function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }); 
}

  export function validateAll(preview, title, year, setErrorElements) {
        let allValid = true
        let errors = {errTitle: "", errYear: "", errImage: ""}
        // Validate Image upload
        if(!preview) {
          errors = {...errors, errImage: "Poster Required"}
          allValid = false
        }

        // Validate title
        if(!title || title === "") {
          errors = {...errors, errTitle: "Title Required"}
          allValid = false;
        }

        // validate publish year
        if(!year || year === 0) {
          errors = {...errors, errYear: "Publishing Year required"}
          allValid = false;
        }
        setErrorElements(errors)
        return allValid
  }

  export function getYears() {
      const currentYear = new Date().getFullYear();
      const yearsGen = [];
      for (let year = currentYear; year >= 1900; year--) {
        
        yearsGen.push(year);
      }
      return yearsGen;
  }

  export async function handleAddEdit(base64Image, preview, title, year, doUpdateImage, updateId, action) {
    try{
        const baseFile = (action === EDIT && !doUpdateImage) ? preview : await toBase64(base64Image);

        const body = {
        title,
        year,
        poster: baseFile,
        doUpdateImage
        };
        
        const res = action === EDIT? await edit(body, updateId): await add(body);

        return res;
    }
    catch(e) {
        throw e;
    }
  }

  async function add(body) {
    const res = await fetch(FETCH_URL + "/movie/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if(res.ok) {
        return true
    }
    else{
        throw data;
    }
  }

  async function edit(body, id) {

    const res = await fetch(FETCH_URL + "/movie/update/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if(res.ok) {
        return true
    }
    else{
        throw data;
    }
  }

  export function handleDropFiles(acceptedFiles, setPreview, setBase64Image, setErrorElements, setDoUpdateImage, action) {
    
    //set up for preview of image
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));

    //set image for uploading in backend
    setBase64Image(file)

    //clear errors
    setErrorElements(prev => ({...prev, errImage : ""}))

    //if update image during edit
    if(action === EDIT) {
      setDoUpdateImage(true)
    }

  }

  export async function getMovie(id, setTitle, setYear, setPreview) {
    try{
      debugger
      const res = await fetch(FETCH_URL + "/movie/" + id, {method: "GET", credentials: "include"})

      const data = await res.json()
      
      if(res.ok) {
        setTitle(data.title)
        setYear(data.year)
        setPreview(data.poster)
      }
      else {
        throw data
      }
    }
    catch(e) {
      throw e;
    }
  }