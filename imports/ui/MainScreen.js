import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const MainScreen = () => {
    const [ibanValue, setIbanValue]= useState("");
    console.log("here is the main screen for vat app");

    handleSubmit= (event) => {
        event.preventDefault();
        console.log("hit submit button:", ibanValue);
        if (ibanValue.length !== 21){
            Swal.fire({
                title: 'Error!',
                text:"Your code is the wrong length, please try again",
                icon: 'error',
                confirmButtonText:" OK Cool, I'd like to try again"
            });
        };
        if(ibanValue.length === 21){
            Swal.fire({
                title: 'Possibly correct but we need to send to server for real verification please click to continue',
                text:"this code has a legal length",
                icon: "success",
                confirmButtonText: 'OK Cool, lets keep going'}  
            ).then(()=>{
                console.log("here is the then function ")
            });
            console.log("here is the next steps to sending the code ")
            const data = {number : ibanValue};
            // data.append('file', "here is some text");
            console.log("here is the post SEND",data )
            // axios.post('https://locahost:3000/checkIbanNumber', data).then(function (response) {
            //     console.log("ANSWER  IS", response);
            // })
            axios({
                method: 'post',
                url: 'https://localhost:3000/checkIbanNumber',
                // url: 'checkIbanNumber',

                data: {
                    number: ibanValue,
                },
            })
            axios({
                method: 'post',
                url: 'https://localhost:3000/checkIbanNumber',
                // url: 'checkIbanNumber',

                data: {
                    number: ibanValue,
                },
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                    "Access-Control-Allow-Origin": "*",
                },
            }).then(function (response) {
                console.log("ANSWER  IS", response);
            }).catch(function (error) {
                console.log(error);
            });
        };
    }

    handleChange = (event) => {
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