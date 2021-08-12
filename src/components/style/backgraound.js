import styled from 'styled-components'

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
        left: 8%;
    }
`

export const PageHeaderWrap = styled.header`
    & h1 {
        position: relative;
        letter-spacing: 3px;
        left: 8%;
    }
`

export const CategoryButtons = styled.div`
    display: flex;
    overflow: hidden;
    // margin-left: 500px;
    // margin-right: 500px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    & .category {
        // flex: 100px;
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 1px solid #00b4db;
        float: left;
        padding: 6px;
        font-weight: 700;
        font-family: 'Roboto', sans-serif;
        margin-left: 20px;
        margin-right: 20px;
    }
`

export const OutPatientBg = styled.div`
    display: flex;
    --border: 1px solid #c06c84;
    overflow: hidden;
    align-items: center;
    justify-content: center;
`

export const BigBoxstyle = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    --align-items: center;
    --justify-content: center;
    position: relative;
    float: left;
    width: 322px;
    height: 548px;
    border: 1px solid #00b4db;
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
    --margin: 39px 10px 0px 10px;
    --top: 41px;
    width: 200px;
    height: 200px;
    position: relative;
    text-align: center;
    border: 2px solid white;
    --border-radius: 5px;
    background: linear-gradient(to top left, #0083b0, #00b4db);
    color: white;

    font-size: 24px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;

    & .countText {
        flex: 1;
        color: #fff;
        position: relative;
        --padding-top: 16px;
    }
    & .countNumber {
        flex: 1;
        position: relative;
        color: #fff;
        --padding-top: 10px;
    }
`
