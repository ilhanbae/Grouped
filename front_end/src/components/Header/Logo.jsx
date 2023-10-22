import React from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../../assets/logo.png';

const Logo = () => {
  return (
    <div className='h-fill w-28'>
      <Link to="/individualCalendar">
      <img className='rounded-sm hover:shadow-md' src={logoImage} alt="Len[cs] Logo" />
      </Link>
    </div>
  )
}

export default Logo