import React from "react"


const ImgView = (props) => {
    const src= props.src
    const alt = props.alt
    const id = props.id

return(
   
        <img src={src} alt={alt} id={id}/>
)
}

export default ImgView