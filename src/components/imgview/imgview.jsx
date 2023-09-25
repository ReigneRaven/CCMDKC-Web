import React from "react"
import '../imgview/imgview.css'


const ImgView = (props) => {
    const src= props.src
    const alt = props.alt

return(
   
        <img src={src} alt={alt} />
)
}

export default ImgView
