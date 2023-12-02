import React from 'react'
import { Link } from 'react-router-dom'
import GroupedImage from '../../assets/grouped.png';

const Logo = () => {
  return (
    <div className='h-fill w-28'>
      <Link to="/individualCalendar">
      <img className='rounded-sm hover:shadow-md' src={GroupedImage} alt="Grouped" />
      </Link>
    </div>
  )
}

export default Logo