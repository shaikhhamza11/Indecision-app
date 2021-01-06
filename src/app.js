console.log(" Hello Hamza")

//JSX javascript xml also known as javascript extension
//template 1
const app = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of computer",
    options: []
};
const onFormSubmit = (e) => {
    e.preventDefault()
    const option = e.target.elements.option.value;
    if (option) {

        app.options.push(option)
        e.target.elements.option.value = ""
        renderFunction()
    }



}
const removeOptions = () => {
    app.options = []
    renderFunction()
}
const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length)
    const option = app.options[randomNum]
    alert(option)
}

const renderFunction = () => {
    let template = (
        <div>
            <h1>{app.title.toUpperCase()}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}

            <p>{app.options.length > 0 ? "Here are your options" : "No options"}</p>
            <ol>

                {
                    app.options.map((option) => {
                        return <li key={option}>{option}</li>
                    })
                }


            </ol>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={removeOptions}>Remove all options</button>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" placeholder="Enter something" />
                <button>Add options</button>


            </form>
        </div>
    );
    ReactDOM.render(template, appRoot)
}
const appRoot = document.querySelector('#app')
renderFunction()