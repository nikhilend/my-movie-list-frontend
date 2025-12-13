import './Header.css'
import '../../utils/Utility.css'
import { useDispatch } from 'react-redux'
import {logoutUser} from '../../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { ADD, FETCH_URL } from '../../utils/constants'

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


async function handleLogout() {
  try {
        const res = await fetch(FETCH_URL + "/user/logout", 
        {method: "POST", credentials: 'include'});
  
        const result = await res.json();
  
        if(res.status === 200) {
          dispatch(logoutUser())
          navigate("/login")
        }
        else {
          throw result
        }
    }
    catch(e) {
        console.log(e)
    }
}
  return (
    <div className='container'>
        <ul className='headerDiv'>
            <li className='head-item-my'>
              My Movies 
                <a id='plus-add' tabIndex="0" className='add-movie-icon'
                onClick={()=> {navigate("/addedit/" + ADD)}}
                >
                  <i  className="bi bi-plus-circle"></i>
                </a>
            </li>
            <li >
             <a tabIndex={0} className='head-item-lo'
             onClick={handleLogout}
             > <span className='logout-name'>Logout</span> <i className="bi bi-box-arrow-right"></i>

             </a>
            </li>
        </ul>
    </div>
  )
}

export default Header