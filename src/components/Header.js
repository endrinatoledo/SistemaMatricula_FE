import React from 'react'

const Header = () =>{

    return (
        <nav 
        // className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between'
        >
            <div className='container'>
                <h1> Sistema de Matricula Escolar</h1>
                <a 
                // className='btn- btn-danger nuevo-post d-block d-md-inline-block' 
                href='/users/new'> Agregar Usuario &#43;</a>


            </div>

        </nav>
    )
}

export default Header