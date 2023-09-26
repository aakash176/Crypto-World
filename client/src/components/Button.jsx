import React from 'react'

const Button = ({children, selected, onClick}) => {
  return (
    <span className='timeBtn' onClick={onClick} style={{border:'2px solid gold', padding:'10px', width:'150px', borderRadius:'5px', textAlign:'center', backgroundColor:selected?'gold':'', color:selected?'black':'', fontWeight:selected?'500':'', cursor:'pointer'}}>{children}</span>
  )
}

export default Button