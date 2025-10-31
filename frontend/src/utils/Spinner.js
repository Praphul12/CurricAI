import React from 'react'
import { Oval } from 'react-loader-spinner'
import './spinner.css'
const Spinner = () => {
  return (
    <div className='course-spinner'>
     <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    </div>
  )
}

export default Spinner