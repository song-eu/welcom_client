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
  --border: 1px solid #C06C84;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const BigBoxstyle = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  --align-items: center;
  --justify-content: center;
  position: relative;
  float: left;
  width: 322px;
  height: 548px;
  border: 1px solid #00B4DB;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  
`

export const SmallBoxstyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    display: position;
    overflow: hidden;
    --margin:39px 10px 0px 10px;
    --top: 41px;
    width: 200px;
    height: 200px;
    position: relative;
    text-align: center;
    border: 2px solid white;
    --border-radius:5px;
    background: linear-gradient(to top left,  #0083B0,#00B4DB);
    color: white;
    
    font-size: 24px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;

    & .countText{
      flex:1;
      color: #fff;
      position: relative;
      --padding-top: 16px;


    }
    & .countNumber {
      flex:1;
      position: relative;
      color: #fff;
      --padding-top: 10px;

    }
`