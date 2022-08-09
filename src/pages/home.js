import { useEffect, useState } from "react"
import axios from 'axios'
// import { GetDrawNumber } from '../utils/time'
// import { Button, ButtonGroup } from '@mui/material'
// import _ from 'lodash'
// import { numToKorean } from 'num-to-korean';








export default function Home() {

    const [price, setPrice] = useState(0)


    useEffect(() => {
        window.exp = {}



        fetchStockPrice()

    }, [])



    function fetchStockPrice() {



        axios.get('https://raspy-base-75ec.kirklayer6590.workers.dev/')
            .then(function (response) {
                // handle success
                console.log(response);
                const data = response.data
                console.log(data)

                console.log(data.response.body.items.item[0].clpr);

                setPrice(data.response.body.items.item[0].clpr)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }




    return (
        <div>
            <h1>{price}</h1>


        </div >
    )
}


