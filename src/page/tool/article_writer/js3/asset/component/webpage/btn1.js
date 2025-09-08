import { Cmpt } from "../../../cmpt/Cmpt.js";



export function btn1 ({styleGroup, tmptMngr}) {
    const component = new Cmpt({
        name: "btn1",
        template: tmptMngr.get("btn"),
        config: null,
    })

    component.addStyle({
        "background-color": "orange",
        "padding": "0.5rem 1rem",
        "border-radius": "20px",
        "border": "2px solid orange",
    })


    component.hook.text.fill({value: "submit"});
    
    component.hook.text.addStyle ({
        "color": "red",
        "font-weight": "600",
        "font-size": "0.8em"
    })    
    return component;
}

