import { Component } from "react";
import Button from "../Button";
import Display from "../Display";
import './style.css';


const initialStates = {
    display: '',
    operator: '',
    values: [],
    currentPosition: 0,
    history: [],
    result: false
}

export default class Calculator extends Component {


    constructor(props) {
        super(props)
        this.state = { ...initialStates }

        this.buttonClick = this.buttonClick.bind(this)
        this.operation = this.operation.bind(this)
        this.clearMemory = this.clearMemory.bind(this)
        this.finalResult = this.finalResult.bind(this)
        this.toogleSignal = this.toogleSignal.bind(this)
    }


    clearMemory() {
        this.setState({ ...initialStates })
    }

    buttonClick(number) {

        if (this.state.result) {
            this.clearMemory()
            this.setState({ display: number })
            return
        }


        if (number === '.' && this.state.display.includes('.')) {
            return
        }

        const position = this.state.currentPosition
        const currentValue = this.state.display + number
        this.setState({ display: currentValue })

        const newValue = parseFloat(currentValue)
        console.log(newValue);
        const arrayValues = [...this.state.values]
        arrayValues[position] = newValue
        this.setState({ values: arrayValues })
    }


    operation(operator) {


        if (this.state.values.length === 2) {
            this.finalResult()
            this.setState({ operator: operator, currentPosition: 1, display: '', result: false })
            return
        }

        const currentValue = (this.state.display)
        const newValue = parseFloat(currentValue)

        if (currentValue === '.') {
            return
        }


        if (this.state.display === '') {
            this.setState({ operator: operator, display: '' })
        } else {
            const history = [...this.state.values]
            history[0] = this.state.values[0]

            this.setState({
                operator: operator,
                values: [newValue],
                history: history,
                display: '',
                currentPosition: 1,
                result: false
            })
        }
    }

    toogleSignal() {

        const position = this.state.currentPosition
        const currentValue = this.state.display
        const newValue = parseFloat(currentValue * (-1))
        const arrayValues = [...this.state.values]
        arrayValues[position] = newValue
        this.setState({ values: arrayValues, display: newValue })
        console.log(arrayValues);
        console.log(currentValue, newValue)

    }

    finalResult() {

        console.log(this.state.display);
        const operator = this.state.operator
        const arrayValues = [...this.state.values]
        const history = [...this.state.values]
        if ((operator === '') || (arrayValues.length < 2)) {
            return
        }


        switch (operator) {
            case '+':
                arrayValues[0] = ((arrayValues[0]) + (arrayValues[1]))
                break;
            case '-':
                console.log(arrayValues);
                arrayValues[0] = ((arrayValues[0]) - (arrayValues[1]))
                console.log(arrayValues);
                break;
            case 'x':
                arrayValues[0] = ((arrayValues[0]) * (arrayValues[1]))
                break;
            case '/':
                if (arrayValues[1] === 0) {
                    alert('Impossível realizar divisão por 0')
                    return
                }
                arrayValues[0] = ((arrayValues[0]) / (arrayValues[1]))
                break;
            default:
                break;
        }


        this.setState({
            values: [arrayValues[0]],
            display: arrayValues[0],
            history: history,
            currentPosition: 0,
            result: true

        })
    }

    render() {
        return (
            <div className='container'>
                <Display display={this.state.display} history={this.state.history}
                    result={this.state.result} values={this.state.values} operator={this.state.operator} />
                <div className='keys'>
                    <Button label='AC' onClick={this.clearMemory} className='clear' />
                    <Button label='/' onClick={this.operation} className='operator' />
                    <Button label='7' onClick={this.buttonClick} className='number' />
                    <Button label='8' onClick={this.buttonClick} className='number' />
                    <Button label='9' onClick={this.buttonClick} className='number' />
                    <Button label='x' onClick={this.operation} className='operator' />
                    <Button label='4' onClick={this.buttonClick} className='number' />
                    <Button label='5' onClick={this.buttonClick} className='number' />
                    <Button label='6' onClick={this.buttonClick} className='number' />
                    <Button label='-' onClick={this.operation} className='operator' />
                    <Button label='1' onClick={this.buttonClick} className='number' />
                    <Button label='2' onClick={this.buttonClick} className='number' />
                    <Button label='3' onClick={this.buttonClick} className='number' />
                    <Button label='+' onClick={this.operation} className='operator' />
                    <Button label='+/-' onClick={this.toogleSignal} className='number' />
                    <Button label='0' onClick={this.buttonClick} className='number' />
                    <Button label='.' onClick={this.buttonClick} className='number' />
                    <Button label='=' onClick={this.finalResult} className='result' />
                </div>
            </div>
        )
    }
}
