import React from 'react'
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'

const HeaderSecond = () => {
  const navigate=useNavigate()
  const username=localStorage.getItem("username")
  const handleLogout=()=>{
    localStorage.removeItem("idToken");
    localStorage.removeItem("cognito_id");
    localStorage.removeItem("company_name");
    localStorage.removeItem("username");
    navigate('/login')
    window.location.reload();
    

  }
  return (
    
      <header class="w-100 sticky-top mainHeader">
        <nav class="navbar navbar-dark mod-nav  navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand logoBg" href="/home"><img src={logo} alt="" /></a>
               

                <div class="dbheadright">
                    {/* <div class="dbusr"><i class="fa-solid fa-user"></i></div> */}
                    <div class="dbusr">{username.slice(0,1).toUpperCase()}</div>
                    <button class="loginBtn" onClick={handleLogout}><img src="assets/images/logout.png" alt=""/> Logout</button>
                </div>
            </div>
        </nav>
    </header>
    
  )
}

export default HeaderSecond
