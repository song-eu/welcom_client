import styled from 'styled-components';

export const MonthlyBarChartStyle = styled.div`
    position: relative;
    float: left;
    left: 50px;
    & #barchart {
        backgroud: tomato;
        border: 1px solid tomato;
    }
    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
      }
`;

export const HorizonBarChartSytle = styled.div`
    position: relative;
    float: left;
    & #hbarchart {
        backgroud: #1488CC;
        border: 1px solid #1488CC;
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
    position:relative;
    float: left;
    overflow: hidden;
    border: 1px solid #FF8C00;
    & h1 {
        position: relative;
        font-size: 24px;
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
`;