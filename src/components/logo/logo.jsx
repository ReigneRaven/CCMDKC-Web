import React from "react"
import '../logo/logo.css'


const DiaLogo = (props) => {
    const src= props.src
    const alt = props.alt

return(
   
        <img src={src} alt={alt}/>
)
}

export default DiaLogo