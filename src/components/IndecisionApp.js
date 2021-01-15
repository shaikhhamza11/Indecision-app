import React from "react";
import AddOption from './AddOption'
import Header from "./Header"
import Action from './Action'
import Options from './Options'
import OptionModal from "./OptionModal"



export default class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.handleRemoveModalOption = this.handleRemoveModalOption.bind(this)
        this.state = {
            options: props.options,
            selectedOption: undefined
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
    //remove selectedOption for modal
    handleRemoveModalOption() {
        this.setState(() => ({
            selectedOption: undefined
        }))
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
        this.setState(() => ({
            selectedOption: option
        }))
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
                <div className="container">
                    <div className="widget">
                        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                            hasOptions={this.state.options.length > 0} />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption} handleRemoveModalOption={this.handleRemoveModalOption} />

            </div>
        );
    }
}
IndecisionApp.defaultProps = {
    options: []
}