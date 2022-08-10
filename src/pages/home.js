import { useEffect, useState } from "react"
import axios from 'axios'
// import { GetDrawNumber } from '../utils/time'
// import { Button, ButtonGroup } from '@mui/material'
// import _ from 'lodash'
// import { numToKorean } from 'num-to-korean';

import moment from 'moment'




export default function Home() {

    const [price, setPrice] = useState(0)


    useEffect(() => {
        window.exp = {}



        fetchStockPrice()

    }, [])



    function fetchStockPrice() {

        const fetchDate = localStorage.fetchDate
        // console.log(fetchDate);
        const today = moment().format('YYYYMMDD')
        // console.log(fetchDate !== today);
        if (fetchDate !== today) {

            axios.get('https://raspy-base-75ec.kirklayer6590.workers.dev/')
                .then(function (response) {
                    console.log("fetching");
                    // handle success

                    const item = response.data.response.body.items.item[0]

                    // console.log(item);


                    setPrice(item.clpr)
                    localStorage.setItem('clpr', item.clpr)
                    localStorage.setItem('fetchDate', today)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        } else {
            console.log('not fetching');
            setPrice(localStorage.clpr)
        }

        // 1안
        // const fetchDate = localStorage.basDt
        // // console.log(fetchDate);
        // const today = moment().format('YYYYMMDD')
        // // console.log(fetchDate !== today);
        // if (fetchDate !== today) {

        //     axios.get('https://raspy-base-75ec.kirklayer6590.workers.dev/')
        //         .then(function (response) {
        //             // handle success

        //             const item = response.data.response.body.items.item[0]

        //             // console.log(item);


        //             setPrice(item.clpr)
        //             localStorage.setItem('clpr',item.clpr)
        //             localStorage.setItem('basDt', item.basDt)
        //         })
        //         .catch(function (error) {
        //             // handle error
        //             console.log(error);
        //         })
        //         .then(function () {
        //             // always executed
        //         });
        // } else {
        //     setPrice(localStorage.clpr)
        // }

    }




    return (
        <div>
            <h1>{price}</h1>


        </div >
    )
}


