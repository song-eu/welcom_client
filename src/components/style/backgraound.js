import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const HeaderWrap = styled.header`
    height: 80px;
    border-bottom: 1px solid #dcdcdc;

    color: tomato;
    font-size: 16px;
    position: sticky;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: 10;
    overflow: hidden;
    display: flex;
    align-items: center;

    & h1 {
        position: relative;
        letter-spacing: 10px;
        left: 8%;
    }
    & .pageButtons {
        overflow: hidden;

        margin-left: auto;
        margin-right: 8%;
    }
`

export const HeaderButton = styled.div`
    font-weight: 700;
    font-family: 'Roboto', sans-serif;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    overflow: hidden;

    font-size: 24px;
    float: left;
    padding: 12px;

    color: ${(props) =>
        props.selstat ? 'tomato' : `${lighten(0.2, '#0575e6')}`};

    &:hover {
        color: ${lighten(0.1, 'tomato')};
    }
    &:active {
        color: ${darken(0.1, 'tomato')};
    }
`

export const PageHeaderWrap = styled.header`
    overflow: hidden;
    & h1 {
        position: relative;
        letter-spacing: 3px;
        left: 8%;
    }
    & .selectedLink {
        float: left;
        padding: 15px;
        overflow: hidden;
        background: #0575e6;
        color: white;
        &:hover {
            background: ${lighten(0.1, '#0575e6')};
        }
        &:active {
            backgrounds: ${darken(0.1, '#0575e6')};
        }
    }
    & .unSelectedLink {
        float: left;
        padding: 15px;
        overflow: hidden;
        color: #6b6b83;
        &:hover {
            color: ${lighten(0.1, '#0575e6')};
        }
        &:active {
            color: ${darken(0.1, '#0575e6')};
        }
    }
    & + & {
        border-left: 1px solid #0575e6;
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
        color: #6b6b83;
        &:hover {
            background: #00b4db;
            color: white;
        }
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
    --width: 322px;
    --height: 598px;
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
    width: 350px;
    height: 200px;
    position: relative;
    text-align: center;
    border: 2px solid #0575e6;
    color: #0575e6;

    font-size: 24px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;

    &:hover {
        background: #0575e6;
        color: white;
    }

    & .countText {
        flex: 1;
        --color: #fff;
        position: relative;
        font-size: 24px;
    }

    & .countNumber {
        flex: 1;
        position: relative;
        --color: #fff;
        --padding-top: 10px;
        font-size: 30px;
        margin-top: 15px;
    }
`

export const SmallBoxstyleOut = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    display: position;
    overflow: hidden;
    --margin-top: 10px
    --margin: 39px 10px 0px 10px;
    --top: 10px;
    width: 700px;
    height: 200px;
    position: relative;
    text-align: center;
    border: 2px solid #0575e6;
    --border-radius: 5px;
    --background: linear-gradient(to top left, #0083b0, #00b4db);
    color: #0575e6;

    font-size: 24px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;

    &:hover {
      background: #0575e6;
      color: white;
  }
    & .countText {
        flex: 1;
        --color: #fff;
        position: relative;
        --padding-top: 16px;
        font-size: 24px;
    }
    & .countNumber {
        flex: 1;
        position: relative;
        --color: #fff;
        --padding-top: 10px;
        font-size: 30px;
        margin-top: 15px;
    }
`
