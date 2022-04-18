import React from 'react'

const ActivateFlashMessage = ({setMessageFlash}) => {
    setMessageFlash(true)
        setTimeout(() => {
            setMessageFlash(false);
        }, 3000);
  return ('')
}


export default ActivateFlashMessage
