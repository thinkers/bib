import React, { Component } from 'react';

class SettingsBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: {
                selectedWhite: true,
                selectedSepia: false,
                selectedBlack: false,
            },
            alignment: {
                left: true,
                center: false,
            },
            size: 3

        }
    }

    toggleColorSelection(color) {
        const selection = {
            selectedWhite: false,
            selectedSepia: false,
            selectedBlack: false
        }

        let elem = document.documentElement;
        elem.classList.remove("white");
        elem.classList.remove("sepia");
        elem.classList.remove("black");

        if (color === "white") {
            selection.selectedWhite = true;
            elem.classList.toggle("white");
        }
        if (color === "sepia") {
            selection.selectedSepia = true;
            elem.classList.toggle("sepia");
        }
        if (color === "black") {
            selection.selectedBlack = true;
            elem.classList.toggle("black");
        }
        this.setState({ selection });
    }

    toggleAlignmentSelection(direction) {
        const alignment = {
            left: false,
            center: false
        }
        let elem = document.documentElement;

        if (direction === "left") {
            alignment.left = true;
            elem.classList.remove("center");
            elem.classList.toggle("left");
        }
        if (direction === "center") {
            alignment.center = true;
            elem.classList.remove("left");
            elem.classList.toggle("center");
        }
        this.setState({ alignment });
    }

    changeSize(newSize) {

        if (newSize === "smaller") {
            newSize = this.state.size - 1;
        }
        if (newSize === "bigger") {
            newSize = this.state.size + 1;
        }

        if (newSize < 0) {
            newSize = 0;
        }
        if (newSize > 6) {
            newSize = 6;
        }


        document.documentElement.classList.forEach(function (value) {
            if (value.includes("size-")) {
                document.documentElement.classList.remove(value);
            };
        });
        document.documentElement.classList.add("size-" + newSize);

        this.setState({ size: newSize });
    }

    render() {
        return (
            <div className="settingsBar">
                <div className="settingsContainer">
                    <div className="colorSwitcher">
                        <div className={this.state.selection.selectedWhite ? 'switchWhite selected' : 'switchWhite'}
                            onClick={() => this.toggleColorSelection("white")}>
                            {this.state.selectedWhite}
                        </div>
                        <div className={this.state.selection.selectedSepia ? 'switchSepia selected' : 'switchSepia'}
                            onClick={() => this.toggleColorSelection("sepia")}>

                        </div>
                        <div className={this.state.selection.selectedBlack ? 'switchBlack selected' : 'switchBlack'}
                            onClick={() => this.toggleColorSelection("black")}>

                        </div>

                    </div>
                    <div className="alignmentSwitcher">


                        <div className={this.state.alignment.left ? 'alignmentLeft selected' : 'alignmentLeft'}
                            onClick={() => this.toggleAlignmentSelection("left")}>

                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 21V20H20V21H3ZM3 17V16H14V17H3ZM3 13V12H20V13H3ZM3 9V8H14V9H3ZM3 5V4H20V5H3Z" fill="black" />
                            </svg>

                        </div>

                        <div className={this.state.alignment.center ? 'alignmentCenter selected' : 'alignmentCenter'}
                            onClick={() => this.toggleAlignmentSelection("center")}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5V4H20V5H3ZM3 9V8H20V9H3ZM3 13V12H20V13H3ZM3 17V16H20V17H3ZM3 21V20H20V21H3Z" fill="black" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="settingsContainer">
                    <div className="smallLetter" onClick={() => this.changeSize("smaller")} >A</div>
                    {
                        [...Array(7).keys()].map((index) =>

                            <div className={this.state.size === index ? 'dot selected' : 'dot'}
                                key={index} onClick={() => this.changeSize(index)}>
                            </div>

                        )
                    }


                    <div className="bigLetter" onClick={() => this.changeSize("bigger")} > A</div>
                </div>
            </div >
        );
    }
}

export default SettingsBar;