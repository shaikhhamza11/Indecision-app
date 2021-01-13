import React from "react"
import Option from "./Option.js"
const Options = (props) => {
    return (
        <div>
            {props.options.length == 0 && <p>Please add an option to get started</p>}
            {props.options.map((option) => <Option handleDeleteOption={props.handleDeleteOption} key={option} optionText={option} />)}
            <button onClick={props.handleDeleteOptions} disabled={!props.hasOptions}>Remove All</button>
        </div>
    )
}
export default Options