class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options: props.options
        }
    }
    //lifecycle Function
    componentDidMount() {
        try {

            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if (options) {

                this.setState(() => ({ options }))
            }
        }
        catch (e) {

        }

    }
    componentDidUpdate(prevState, prevProps) {
        const json = JSON.stringify(this.state.options)
        if (prevState.options.length !== this.state.options.length) {
            localStorage.setItem('options', json)

        }
    }
    //delete all

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }))
        localStorage.clear()
    }
    //handle pick
    handlePick() {
        const random = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[random]
        alert(option)
    }
    //handleaddoption
    handleAddOption(option) {
        if (!option) {
            return "Please type an Option"
        }
        else if (this.state.options.indexOf(option) > -1) {
            return "option Exist"

        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }))
    }
    //remove a single option
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => optionToRemove !== option)
            }
        })
        localStorage.removeItem('options', optionToRemove)

    }
    render() {

        const subtitle = "Put your life in the hands of Computer"

        return (
            <div>

                <Header subtitle={subtitle} />
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                    hasOptions={this.state.options.length > 0} />
                <AddOption handleAddOption={this.handleAddOption} />

            </div>
        );
    }
}
IndecisionApp.defaultProps = {
    options: []
}

//class based component
// class Header extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>{this.props.title} </h1>
//                 <h3>{this.props.subtitle}</h3>
//             </div>
//         );
//     }
// }


// class Action extends React.Component {

//     render() {
//         return (
//             <button onClick={this.props.handlePick} disabled={!this.props.hasOptions}>What Should I do?</button>
//         );
//     }
// }
// class Options extends React.Component {




//     render() {

//         return (

//             <div>
//                 {this.props.options.map((option) => <Option key={option} optionText={option} />)}
//                 <button onClick={this.props.handleDeleteOptions} disabled={!this.props.hasOptions}>Remove All</button>
//             </div>
//         );
//     }
// }
// class Option extends React.Component {
//     render() {

//         return (
//             <div>
//                 {<p>{this.props.optionText}</p>}
//             </div>
//         )
//     }
// }
//stateless functional component
const Header = (props) => {

    return (
        <div>
            <h1>{props.title} </h1>
            <h3>{props.subtitle}</h3>
        </div>
    );
}
Header.defaultProps = {
    title: "Indecision App"
}
const Action = (props) => {
    return (
        <button onClick={props.handlePick} disabled={!props.hasOptions}>What Should I do?</button>
    );
}


const Options = (props) => {
    return (
        <div>
            {props.options.length == 0 && <p>Please add an option to get started</p>}
            {props.options.map((option) => <Option handleDeleteOption={props.handleDeleteOption} key={option} optionText={option} />)}
            <button onClick={props.handleDeleteOptions} disabled={!props.hasOptions}>Remove All</button>
        </div>
    )
}
const Option = (props) => {
    return (
        <div>

            {props.optionText}
            <button onClick={(e) => {
                props.handleDeleteOption(props.optionText)
            }}>X</button>

        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }

    }


    handleAddOption(e) {

        e.preventDefault()
        const option = e.target.elements.options.value.trim()
        const error = this.props.handleAddOption(option)
        this.setState(() => ({ error }))
        if (!error) {

            e.target.elements.options.value = ""
        }
    }


    render() {

        return (
            <div>
                {}
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="options"></input>
                    <button>Add option</button>
                </form>

            </div>
        );
    }
}



ReactDOM.render(<IndecisionApp options={[]} />, document.querySelector("#app"))