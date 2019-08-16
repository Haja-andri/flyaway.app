import React from 'react';



export default function ErrorPop(){
    const clearErrorPrint = (event) => {
        event.preventDefault();
        event.currentTarget.classList.add('hide');
    }

    return(
        <div 
            id="error-box" 
            className="error-container hide"
            onClick={clearErrorPrint}>   
        </div>
    );
}