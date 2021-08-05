import styled from 'styled-components';

export const MonthlyBarChartStyle = styled.div`
    position: relative;
    float: left;
    --border: 1px solid tomato;
    margin-left: 60px;
    & #barchart {
        backgroud: tomato;
        --border: 1px solid tomato;
    }
    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
    & malevalue{
        
    }
`;

export const HorizonBarChartSytle = styled.div`
flex:1;
    position: relative;
    --border: 1px solid #1488CC;
    float: left;
    overflow: hidden;

    & #hbarchart {
        backgroud: #1488CC;
        --border: 1px solid #1488CC;
    }
    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }

`;

export const GenderChartSytle = styled.div`
    flex:1;
    position:relative;
    float: left;
    overflow: hidden;
    --border: 1px solid #FF8C00;
    margin-left: 30px;
    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
    & div {
        backgroud: #FF8C00;
        --border: 1px solid #1488CC;
    }
`;

export const PieChartStyle = styled.div`
flex:1;
    position:relative;
    float: left;
    --border: 1px solid #45a247;
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
        --border: 1px solid #1488CC;
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
`;