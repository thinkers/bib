import React from 'react';

const TopBar = (props) => {


    return <div className="topBar">
        <div className="leftContainer">
            <div className="headerIcon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 7.5H19.5V9H14.25V7.5Z" fill="black" />
                    <path d="M14.25 11.25H19.5V12.75H14.25V11.25Z" fill="black" />
                    <path d="M14.25 15H19.5V16.5H14.25V15Z" fill="black" />
                    <path d="M4.5 7.5H9.75V9H4.5V7.5Z" fill="black" />
                    <path d="M4.5 11.25H9.75V12.75H4.5V11.25Z" fill="black" />
                    <path d="M4.5 15H9.75V16.5H4.5V15Z" fill="black" />
                    <path d="M21 3.75H3C2.6023 3.7504 2.221 3.90856 1.93978 4.18978C1.65856 4.471 1.5004 4.8523 1.5 5.25V18.75C1.5004 19.1477 1.65856 19.529 1.93978 19.8102C2.221 20.0914 2.6023 20.2496 3 20.25H21C21.3977 20.2496 21.779 20.0914 22.0602 19.8102C22.3414 19.529 22.4996 19.1477 22.5 18.75V5.25C22.4996 4.8523 22.3414 4.471 22.0602 4.18978C21.779 3.90856 21.3977 3.7504 21 3.75ZM3 5.25H11.25V18.75H3V5.25ZM12.75 18.75V5.25H21V18.75H12.75Z" fill="black" />
                </svg>
            </div>
            <div className="headerIcon spacer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" fill="#1F1F1F" />
                </svg>
            </div>
        </div>

        <div className="rightContainer">
            <div className="headerIcon spacer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 12C15.2044 12 14.4413 11.6839 13.8787 11.1213C13.3161 10.5587 13 9.79565 13 9V5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V12H16ZM14 9C14 9.53043 14.2107 10.0391 14.5858 10.4142C14.9609 10.7893 15.4696 11 16 11H19.586L14 5.414V9ZM5 4H14L21 11V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H5C4.20435 21 3.44129 20.6839 2.87868 20.1213C2.31607 19.5587 2 18.7956 2 18V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4ZM5 8H11V9H5V8ZM5 12H11V13H5V12ZM5 16H18V17H5V16Z" fill="black" />
                </svg>

            </div>
            <div className="headerIcon " onClick={props.showSettings}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2597 19.2523L12.7801 15.5828H19.6891L21.1518 19.2523H22.9608L17.0718 5H15.5322L9.54688 19.2523H11.2597ZM16.2442 7.08818H16.2827L19.0925 14.0826H13.3767L16.2442 7.08818Z" fill="#1F1F1F" />
                    <path d="M3.48837 19.2527L4.2907 17.5033H8.05814L8.83721 19.2527H10.3837L6.83721 11.7074H5.56977L2 19.2527H3.48837ZM6.17442 13.3496H6.19767L7.56977 16.4192H4.77907L6.17442 13.3496Z" fill="#1F1F1F" />
                </svg>

            </div>
        </div>
    </div>;

}

export default TopBar;