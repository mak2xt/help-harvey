import {mobileAndTabletcheck} from "../util/util";


export class GameContainer {
    /**
     *
     * @param {string} elementID
     */
    constructor(elementID){
        this.container = document.getElementById(elementID)
        if(mobileAndTabletcheck()){
            let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            this.container.style.height = `${height}px`
        }
    }
    /**
     *
     * @param {Function} leftHandler
     * @param {Function} rightHandler
     */
    injectTouchControls(leftHandler, rightHandler){
        let buttons = [
            {
                class: 'button-left',
                containerClass: ['touch-container', 'left'],
                onclick: leftHandler
            },
            {
                class: 'button-right',
                containerClass: ['touch-container', 'right'],
                onclick: rightHandler
            }
        ];
        let controls = document.createElement('div')
        controls.id = "controls"
        for(let button of buttons){
            let btnContainer = document.createElement("div")
            btnContainer.onclick = button.onclick;
            btnContainer.classList.add(...button.containerClass);
            let btn = document.createElement("button")
            btn.classList.add(button.class);

            btnContainer.appendChild(btn);

            controls.appendChild(btnContainer);
        }
        this.container.appendChild(controls)
    }

    /**
     * @returns {{width: number, height: number}}
     */
    getDimensions(){
        let rect = this.container.getBoundingClientRect()
        return {
            width: rect.width,
            height: rect.height
        }
    }

    /**
     * @description container
     */
    getElement(){
        return this.container
    }
}