import React from "react"

const Action = (props) => {
    return (
        <button className="big-button"
            onClick={props.handlePick} disabled={!props.hasOptions}>What Should I do?</button>
    );
}
export default Action