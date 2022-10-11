import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const MainScreen = () => {
    const [ibanValue, setIbanValue] = useState("");

    const handleSubmit = ( event ) => {
        event.preventDefault();

        if ( ibanValue.length !== 21 ){
            Swal.fire({
                title: 'Error!',
                text:"Your code is not long enough, please try again",
                icon: 'error',
                confirmButtonText:" OK Cool, I'd like to try again"
            });
        };

        if( ibanValue.length >= 21 ){
             const data = {
                number : ibanValue
             };

             axios.post( '/checkIbanNumber', data )
             .then( function (response) {
                const bankData =  response.data.bankData
                if(
                    bankData.isCountryCodeValid === true &&
                    bankData.isTwoDigitIdentifierValid === true &&
                    bankData.isBankCodeValid === true && 
                    bankData.isAccountCodeValid === true
                ){
                    Swal.fire({
                        title: 'This is a legal IBN number',
                        text:"This meets the parameters for a legal IBAN number",
                        icon: "success",
                        confirmButtonText: 'OK, Cool, lets keep going'}  
                    )  
                };

                if(
                    bankData.isCountryCodeValid === false ||
                    bankData.isTwoDigitIdentifierValid === false ||
                    bankData.isBankCodeValid === false ||
                    bankData.isAccountCodeValid === false
                ){
                    const message = `The following fields are incorrect\n: 
                     ${bankData.isCountryCodeValid ? "" : "Country code is invalid\n"}
                     ${bankData.isTwoDigitIdentifierValid ? "" : "2 digit identifier is invalid\n"}
                     ${bankData.isBankCodeValid? "" : "Bankcode is not numeric\n"}
                     ${bankData.isAccountCodeValid ? "" : "Account is not  capital letters alphaneumeric\n"}
                    `
                    Swal.fire({
                        title: 'This is not a valid bank number',
                        text:`This does not meet the parameters for a legal IBAN number\n. 
                        ${message}`,
                        icon: "error",
                        confirmButtonText: 'Would you like to play again?'}  
                    )  
                } ; 
            })
        };
    };

    const handleChange = ( event ) => {
        setIbanValue(event.target.value)
    };

    return( 
        <>   
            <p  style={{textAlign: 'center'}} >IBAN code verification for Lichtenstein.</p>
            <p  style={{textAlign: 'center'}} >Please note this only checks if this is a code that is possibly used it does not check if this code actually has a known, real bank code in the first 5 digits
            </p>
            <form  style={{textAlign : 'center'}}  onSubmit={handleSubmit} >
                <label htmlFor="iBANCode">Enter a possible valid IBAN code here. Do NOT include any blank spaces: </label>
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