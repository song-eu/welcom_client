import styled from 'styled-components';

export const HeaderWrap = styled.header`
  height: 60px;
  border-bottom: 1px solid #dcdcdc;
  text-align: left-center;
  color: tomato;
  font-size: 16px;
  position: sticky;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 10;

  & h1 {
    position: relative;
    letter-spacing: 10px;
    left: 3%
  }
`
export const OutPatientBg = styled.div`
  display: flex;
  border: 1px solid #C06C84;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const BigBoxstyle = styled.div`
  flex:1;
  display: inline-block;
  position: relative;
  float: left;
  width: 322px;
  height: 548px;
  border: 1px solid black;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  
`

export const SmallBoxstyle = styled.div`
    margin:39px 10px 0px 10px;
    top: 41px;
    width: 300px;
    height: 100px;
    position: relative;
    text-align: center;
    border: 1px solid #373737;
    border-radius:5px;
    background: #fff;
    
    font-size: 24px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
    


    & .countText{
        color: #333;
        position: relative;
        padding-top: 16px
    }
    & .countNumber {
        position: relative;
        color: #373737;
        padding-top: 10px
    }
`