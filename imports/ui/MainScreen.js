import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const MainScreen = () => {
    const [ibanValue, setIbanValue]= useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (ibanValue.length !== 21){
            Swal.fire({
                title: 'Error!',
                text:"Your code is the wrong length, please try again",
                icon: 'error',
                confirmButtonText:" OK Cool, I'd like to try again"
            });
        };
        if(ibanValue.length >= 21){
            Swal.fire({
                title: 'Possibly correct but we need to send to server for real verification please click to continue',
                text:"this code has a legal length",
                icon: "success",
                confirmButtonText: 'OK Cool, lets keep going'}  
            )

             const data = {
                number : ibanValue
             }
             console.log("here is the post SEND",  data)
             axios.post('/checkIbanNumber', data)
             .then(function (response) {
                console.log("ANSWER  IS", 
                    response.data.countryCode,
                    response.data.twoDigitIdentifier,
                    response.data.bankCode,
                    response.data.accountCode);
            })
        };
    }

    const handleChange = (event) => {
        setIbanValue(event.target.value)
    }

    return( 
        <>   
            <p>IBAN code verification for Lichtenstein.</p>
            <p>Please note this only checks if this is a code that is possibly used it does not check if this code actually has a known, real bank code in the first 5 digits
            </p>
            <form onSubmit={handleSubmit} >
                <label htmlFor="iBANCode">Enter a possible valid IBAN code here : </label>
                <br/>
                <input 
                    type="text" 
                    id="iBANCode" 
                    name="iBANCode" 
                    value={ibanValue} 
                    onChange={handleChange}
                />
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )}



export default MainScreen;