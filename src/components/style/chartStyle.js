import styled from 'styled-components'

export const MonthlyBarChartStyle = styled.div`
    // border: 1px solid tomato;
    width: ${(props) => props.width}px;
    & #barchart {
        backgroud: tomato;
        // --border: 1px solid tomato;
    }
    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
`

export const HorizonBarChartSytle = styled.div`
    flex: 1;
    position: relative;
    // border: 1px solid #1488cc;
    overflow: hidden;

    & #hbarchart {
        backgroud: #1488cc;
        // --border: 1px solid #1488cc;
    }
    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
`

export const GenderChartSytle = styled.div`
    flex: 1;
    position: relative;
    float: left;
    overflow: hidden;
    // --border: 1px solid #ff8c00;
    margin-left: 10px;
    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
    & div {
        backgroud: #ff8c00;
        // --border: 1px solid #1488cc;
    }
`

export const PieChartStyle = styled.div`
flex:1;
    position:relative;
    float: left;
    // --border: 1px solid #45a247;
    overflow: hidden;
    margin-left: 30px;

    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
    & div {
        backgroud: #45a247;
        // --border: 1px solid #1488CC;
    }
    & #toolTip {
        position: absolute;
        border: 0 none;
        border-radius: 4px 4px 4px 4px;
    /*     background-color: white; */
        background: rgba(0, 0, 0, 0.8);
        color : white;
        padding: 1px 10px 1px 10px;
        text-align: center;
    }

}
`
export const StackChartStyle = styled.div`
    box-sizing: content-box;

    // border: 1px solid tomato;

    & h1 {
        --position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
    & #barchartbody {
        display: flex;
        flex-direction: row;
    }
`

export const MapBubbleChartStyle = styled.div`
    box-sizing: content-box;

    // border: 1px solid tomato;

    & h1 {
        --position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
`

export const GenderDivergingBarChartSytle = styled.div`
    overflow: hidden;
    // border: 1px solid #ff8c00;
    // width: ${(props) => props.width}px;
    padding: 0 10px 0 10px;
    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
`
