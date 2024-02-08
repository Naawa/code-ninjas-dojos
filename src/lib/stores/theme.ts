import { writable } from "svelte/store"

interface Theme {
    bdrop: string,
    bgCol: string,
    textCol: string,
    textShade: string,
    bigFocus: string,
    v1: string,
    v2: string,
    v3: string,
}

function createTheme() {
    let theme = writable<Theme>({
        bdrop: "",
        bgCol: "",
        textCol: "",
        textShade: "",
        bigFocus: "",
        v1: "",
        v2: "",
        v3: "",
    })

    return {
        ...theme
    }
}

export const theme = createTheme()

export const typing: Theme = {
    bdrop: "background: linear-gradient(312deg, rgba(0,169,255,1) 0%, rgba(69,252,188,1) 100%)",
    bgCol: "#0E2937",
    textCol: "#ffffff",
    textShade: "#dfb53e",
    bigFocus:  "../../../typing/Keyboard.png",
    v1: "../../../typing/Block.png",
    v2: "../../../typing/Ninja2.png",
    v3: "../../../typing/Star.png",
}

export const training: Theme = {
    bdrop: "background: linear-gradient(312deg, rgba(149,62,223,1) 0%, rgba(252,131,69,1) 100%);)",
    bgCol: "#ffffff",
    textCol: "#3A78BA",
    textShade: "#3A78BA",
    bigFocus:  "../../../training/Rocket.png",
    v1: "../../../training/Block.png",
    v2: "../../../training/Planet.png",
    v3: "../../../training/Star.png",
}

export const waterBreak: Theme = {
    bdrop: "background-image: url(\"../../../break/Background.png \");",
    bgCol: "#ffffff",
    textCol: "#0E2937",
    textShade: "grey",
    bigFocus:  "../../../break/WaterGlass.png",
    v1: "../../../training/Block.png",
    v2: "../../../typing/Ninja2.png",
    v3: "../../../break/Star.png",
}

export const exploration: Theme = {
    bdrop: "background-image: url(\"../../../exploration/Background.png \");",
    bgCol: "#0E2937",
    textCol: "#0DB88F",
    textShade: "#07A881",
    bigFocus:  "../../../exploration/Map.png",
    v1: "../../../training/Star.png",
    v2: "../../../training/Block.png",
    v3: "../../../exploration/Bino.png",
}

export const homeTime: Theme = {
    bdrop: "background-image: url(\"../../../exploration/Background.png \");",
    bgCol: "#0E2937",
    textCol: "#0DB88F",
    textShade: "#07A881",
    bigFocus:  "../../../exploration/Map.png",
    v1: "../../../training/Star.png",
    v2: "../../../training/Block.png",
    v3: "../../../exploration/Bino.png",
}