export function GetDrawNumber() {
    const firstDraw = new Date(2002, 11, 7, 20, 40, 0);
    // console.log(firstDraw.toString())
    // console.log(firstDraw.getTime())

    // console.log(Date.now())

    let elapsedTime = Date.now() - firstDraw.getTime()
    // console.log(elapsedTime* 0.001 /3600/24/7)
    // console.log(elapsedTime/604800000)
    // console.log(Math.trunc(elapsedTime/604800000)+1)

    let drawNum = Math.trunc(elapsedTime / 604800000) + 1

    return drawNum
}

// let response = await fetch(request)
// response = new Response(response.body, response)
// response.headers.set('access-control-allow-origin', '*')
// response.headers.set('access-control-allow-headers', '*')

// 1000개 테스트
        // console.time('test')
        // for (let index = 0; index < 100000; index++) {


        //     AutoPick()
        // }
        // console.timeEnd('test')

        // const test = GetDrawNumber();
        // console.log(test);




//         순위	등위별 총 당첨금액	당첨게임 수	1게임당 당첨금액	당첨기준	비고
// 1등	24,475,413,376원	4	6,118,853,344원	당첨번호 6개 숫자일치	1등
// 자동4
// 2등	4,079,235,564원	69	59,119,356원	당첨번호 5개 숫자일치
// +보너스 숫자일치
// 3등	4,079,236,672원	2,671	1,527,232원	당첨번호 5개 숫자일치
// 4등	6,733,250,000원	134,665	50,000원	당첨번호 4개 숫자일치
// 5등	11,292,130,000원	2,258,426	5,000원	당첨번호 3개 숫자일치