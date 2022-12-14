import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';


export default function StockCard({ price, stockQtt, spentMoney, averagePrice, evalMoney }) {

    const result = evalMoney - spentMoney
    const roi = result / spentMoney * 100 || 0
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>

                        <Typography color={"text.secondary"}>삼성전자</Typography>
                        <Typography color={"text.primary"}>{price.toLocaleString()}원</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <div>평가손익 {result.toLocaleString()}원</div>
                        <div>수익률 {roi}%</div>
                    </Grid>
                    <Divider />
                    <Grid item xs={6}>

                        <Typography color={"text.secondary"}>보유수량</Typography>
                        <Typography color={"text.primary"}>{stockQtt}개</Typography>
                    </Grid>
                    <Grid item xs={6}>

                        <Typography color={"text.secondary"}>매수평균가</Typography>
                        {/* <Typography color={"text.primary"}>{averagePrice.toLocaleString() || 0}원</Typography> */}
                        <Typography color={"text.primary"}>{Number.isNaN(averagePrice) ? 0 : averagePrice.toLocaleString()}원</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color={"text.secondary"}>평가금액</Typography>
                        <Typography color={"text.primary"}>{evalMoney.toLocaleString()}원</Typography>
                    </Grid>
                    <Grid item xs={6}>

                        <Typography color={"text.secondary"}>매수금액</Typography>
                        <Typography color={"text.primary"}>{spentMoney.toLocaleString()}원</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}