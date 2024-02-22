import React from 'react'

function ImageView(props) {
  return (

    <form onClick={()=>{props.handleHideImage()}} className="fixed flex flex-col  left-[50%] top-[50%]  transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-full h-full   rounded-xl z-30">

         <img  className=' h-full' src={props.imageSelector} alt=''></img>
    </form>

  )
}

export default ImageView