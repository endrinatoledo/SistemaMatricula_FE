import React from 'react'

const ValidateEmail = ({email}) => {

    const re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

    return (!re.exec(email)) ? false : true
}

export default ValidateEmail