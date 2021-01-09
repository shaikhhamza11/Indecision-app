class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            options: []
        }
    }
    //delete all

    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            }
        })
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
            return "Option does not exist"
        }
        else if (this.state.options.indexOf(option) > -1) {
            return "option Exist"

        }

        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            }
        })
    }

    render() {
        const title = "Indecision App"
        const subtitle = "Put your life in the hands of Computer"

        return (
            <div>

                <Header title={title} subtitle={subtitle} />
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    hasOptions={this.state.options.length > 0} />
                <AddOption handleAddOption={this.handleAddOption} />

            </div>
        );
    }
}



class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title} </h1>
                <h3>{this.props.subtitle}</h3>
            </div>
        );
    }
}
class Action extends React.Component {

    render() {
        return (
            <button onClick={this.props.handlePick} disabled={!this.props.hasOptions}>What Should I do?</button>
        );
    }
}

class Options extends React.Component {




    render() {

        return (

            <div>
                {this.props.options.map((option) => <Option key={option} optionText={option} />)}
                <button onClick={this.props.handleDeleteOptions} disabled={!this.props.hasOptions}>Remove All</button>
            </div>
        );
    }
}
class Option extends React.Component {
    render() {

        return (
            <div>
                {<p>{this.props.optionText}</p>}
            </div>
        )
    }
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
        e.target.elements.options.value = ""
        this.setState(() => {
            return {
                error
            }
        })
    }


    render() {

        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="options"></input>
                    <button>Add option</button>
                </form>

            </div>
        );
    }
}



ReactDOM.render(<IndecisionApp />, document.querySelector("#app"))