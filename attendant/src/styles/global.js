import {createGlobalStyle} from 'styled-components';
import COLORS from './colors';

export default createGlobalStyle`

    *{
        margin: 0px;
        padding: 0px;
        outline: 0;
        box-sizing: border-box;
        font-size: 16px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    ::-webkit-scrollbar {
        width: 5px;
        margin-right: 5px;
    }
  
    ::-webkit-scrollbar-track {
        background: transparent;
        padding-right: 5px;
    }
      
    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        background: ${COLORS.lightGrayColor}; 
    }
  
    ::-webkit-scrollbar-thumb:hover {
        background: #999;
    }

    :root {
        --main-color: ${COLORS.mainColor};
        --second-color: ${COLORS.secondColor};
        --primary-color: ${COLORS.primaryColor};
        --danger-color: ${COLORS.dangerColor};
        --success-color: ${COLORS.successColor};
        --dark-color: ${COLORS.darkColor};
        --gray-color: ${COLORS.grayColor};
        --light-gray-color: ${COLORS.lightGrayColor};
        --white-color: ${COLORS.whiteColor};
        --light-color: ${COLORS.lightColor};
        --text-gray-color: ${COLORS.textGrayColor};
    }

    .main-color{color: var(--main-color) !important;}
    .second-color{color: var(--second-color) !important;}
    .primary-color{color: var(--primary-color) !important;}
    .danger-color{color: var(--danger-color) !important;}
    .success-color{color: var(--success-color) !important;}
    .dark-color{color: var(--dark-color) !important;}
    .gray-color{color: var(--gray-color) !important;}
    .white-color{color: var(--white-color) !important;}
    .light-gray-color{color: var(--light-gray-color) !important;}
    .text-gray-color{color: var(--text-gray-color) !important;}
    .light-color{color: var(--light-color) !important;}

    .main-background{background-color: var(--main-color) !important;}
    .second-background{background-color: var(--second-color) !important;}
    .primary-background{background-color: var(--primary-color) !important;}
    .danger-background{background-color: var(--danger-color) !important;}
    .success-background{background-color: var(--success-color) !important;}
    .dark-background{background-color: var(--dark-color) !important;}
    .gray-background{background-color: var(--gray-color) !important;}
    .white-background{background-color: var(--white-color) !important;}
    .light-gray-background{background-color: var(--light-gray-color) !important;}
    .text-gray-background{background-color: var(--text-gray-color) !important;}
    .light-background{background-color: var(--light-color) !important;}

`