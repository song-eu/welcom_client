import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

export const IOSSlider = styled(Slider)(({ theme }) => ({
    color: '#fff',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 20,
        fontWeight: 'normal',
        top: -6,
        backgroundColor: 'unset',
        color: '#fff',
        '&:before': {
            color: '#fff',
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: '#fff',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
        opacity: 0.5,
        display: 'none',

        backgroundColor: '#fff',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        border: 'none',

        // backgroundColor: '#bfbfbf',
        backgroundColor: '#fff',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        // backgroundColor: '#fff',
        // opacity: 0.5,

        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: '#bfbfbf',
        },
    },
    '& .MuiSlider-markLabel': {
        color: '#fff',
        fontSize: 18,
    },
}))
