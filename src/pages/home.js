import { useEffect, useRef, useState } from "react"
import axios from 'axios'
// import { GetDrawNumber } from '../utils/time'
// import { Button, ButtonGroup } from '@mui/material'
// import _ from 'lodash'
// import { numToKorean } from 'num-to-korean';

import moment from 'moment'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import StockCard from '../components/stockCard'
import { Button, Divider, Grid, TextField } from "@mui/material";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Home() {

    const [price, setPrice] = useState(localStorage.clpr ?? 0)
    // let stockQtt = localStorage.stockQtt ?? 0
    // let spentMoney = localStorage.spentMoney ?? 0
    const [stockQtt, setStockQtt] = useState(localStorage.stockQtt ?? 0)
    const [spentMoney, setSpentMoney] = useState(localStorage.spentMoney ?? 0)
    const [evalMoney, setEvalMoney] = useState(price * stockQtt)
    const [averagePrice, setAveragePrice] = useState(spentMoney / stockQtt)
    const [krw, setKrw] = useState(localStorage.krw ?? 20000000)
    const [totalAsset, setTotalAsset] = useState(+krw + +evalMoney)

    const qttRef = useRef()
    const costRef = useRef()


    useEffect(() => {
        window.exp = {}



        fetchStockPrice()

    }, [])

    useEffect(() => {

    }, [stockQtt, spentMoney])


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

        // 1???
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


    function buy() {
        // console.log(qttRef.current.value);

        // let stockQtt = localStorage.stockQtt ?? 0
        // let spentMoney = localStorage.spentMoney ?? 0
        let tmpKrw = Number(krw) - Number(costRef.current.value)

        if (tmpKrw < 0) {
            alert("??? ?????? ????????????")
        } else {

            let tmpstockQtt = Number(stockQtt)
            let tmpspentMoney = Number(spentMoney)

            tmpstockQtt += Number(qttRef.current.value)
            tmpspentMoney += Number(costRef.current.value)


            localStorage.setItem('stockQtt', tmpstockQtt)
            localStorage.setItem('spentMoney', tmpspentMoney)

            localStorage.setItem('krw', tmpKrw)

            setStockQtt(tmpstockQtt)
            setSpentMoney(tmpspentMoney)

            setEvalMoney(price * tmpstockQtt)
            setAveragePrice(tmpspentMoney / tmpstockQtt)
            // ??? ?????? krw ????????? ???????????? ..
            setKrw(tmpKrw)
            setTotalAsset(tmpKrw + (price * tmpstockQtt))
        }



    }

    function sell() {
        let tmpstockQtt = Number(stockQtt)
        let tmpspentMoney = Number(spentMoney)

        tmpstockQtt -= Number(qttRef.current.value)
        tmpspentMoney -= Number(costRef.current.value)

        if (tmpstockQtt < 0) {
            alert("???????????? ????????????")
        } else {

            let tmpKrw = Number(krw) + Number(costRef.current.value)

            localStorage.setItem('stockQtt', tmpstockQtt)
            localStorage.setItem('spentMoney', tmpspentMoney)

            localStorage.setItem('krw', tmpKrw)

            setStockQtt(tmpstockQtt)
            setSpentMoney(tmpspentMoney)

            setEvalMoney(price * tmpstockQtt)
            setAveragePrice(tmpspentMoney / tmpstockQtt)
            // ??? ?????? krw ????????? ???????????? ..
            setKrw(tmpKrw)
            setTotalAsset(tmpKrw + (price * tmpstockQtt))
        }

    }

    function cost() {

        // costRef.current.value = (qttRef.current.value * price).toLocaleString()
        costRef.current.value = qttRef.current.value * price
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <h3>???????????? ????????? : {price.toLocaleString()}???</h3>
            {/* <div>???????????? ?????????</div> */}
            {/* <div>{price}???</div> */}
            <Grid container spacing={2} >
                <Grid item xs={6}>
                    <div>??????KRW</div>
                    <div>{krw.toLocaleString()}???</div>
                </Grid>
                <Grid item xs={6}>
                    <div>??? ????????????</div>
                    <div>{totalAsset.toLocaleString()}???</div>
                </Grid>
            </Grid>
            <Divider />
            <StockCard price={price} stockQtt={stockQtt} spentMoney={spentMoney} evalMoney={evalMoney} averagePrice={averagePrice} />
            <Grid container  >
                <TextField onChange={cost} inputRef={qttRef} fullWidth label="??????" color="primary" required />
                <TextField inputRef={costRef} fullWidth helperText="??????" color="primary" disabled />
                <Grid item xs={6}>
                    <Button onClick={sell} sx={{ backgroundColor: "blue", color: "white", width: "200px" }} variant="contained" >??????</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={buy} sx={{ width: "200px" }} color="error" variant="contained">??????</Button>
                </Grid>
            </Grid>

        </ThemeProvider>
    )
}

//<TextField></TextField>


