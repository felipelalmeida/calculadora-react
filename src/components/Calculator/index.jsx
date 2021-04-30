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
        this.clearDisplay = this.clearDisplay.bind(this)
        this.operation = this.operation.bind(this)
        this.clearMemory = this.clearMemory.bind(this)
        this.finalResult = this.finalResult.bind(this)
    }

    clearDisplay() {
        this.setState({
            display: ''
        })
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


        let position = this.state.currentPosition
        const currentValue = this.state.display
        const newDisplay = currentValue + number
        this.setState({ display: newDisplay })

        if (number !== '.') {
            const newValue = parseFloat(newDisplay)
            const arrayValues = [...this.state.values]
            arrayValues[position] = newValue
            this.setState({ values: arrayValues })

        }

        console.log(this.state.values, this.state.operator, this.state.currentPosition, this.state.history)
    }


    operation(operator) {


        if (this.state.values.length === 2) {
            this.finalResult()
            this.setState({ operator: operator, currentPosition: 1, display: '', result: false })
            return
        }

        const currentValue = (this.state.display)
        const newValue = parseFloat(currentValue)

        if (newValue === '.') {
            return
        }


        if (this.state.display === '') {
            this.setState({ operator: operator, display: '' })
        } else {
            console.log(newValue);
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

        console.log(this.state.values, this.state.operator, this.state.currentPosition, this.state.history)

    }

    finalResult() {

        const operator = this.state.operator
        const arrayValues = [...this.state.values]
        const history = [...this.state.values]
        if ((operator === '') || (arrayValues.length < 2)) {
            return
        }


        switch (operator) {
            case '+':
                arrayValues[0] = (arrayValues[0] + arrayValues[1])
                break;
            case '-':
                arrayValues[0] = (arrayValues[0] - arrayValues[1])
                break;
            case '*':
                arrayValues[0] = (arrayValues[0] * arrayValues[1])
                break;
            case '/':
                arrayValues[0] = (arrayValues[0] / arrayValues[1])
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

        console.log('====================================');
        console.log(arrayValues, operator, this.state.currentPosition);
        console.log('====================================');
    }

    render() {
        return (
            <div className='mainContainer'>
                <span className='teste2'>  {`  `}
                    {(this.state.history.length > 0 && !this.state.result) && <span>{`${this.state.values[0]} ${this.state.operator}`}</span>}
                    {(this.state.result) && <span>{`${this.state.history[0]} ${this.state.operator} ${this.state.history[1]} =`}</span>}
                </span>
                <div className='teste'>
                    <Display display={this.state.display} />
                    <div className='keys'>
                        <Button label='AC' onClick={this.clearMemory} className='clear' />
                        <Button label='/' onClick={this.operation} className='operator' />
                        <Button label='7' onClick={this.buttonClick} className='number' />
                        <Button label='8' onClick={this.buttonClick} className='number' />
                        <Button label='9' onClick={this.buttonClick} className='number' />
                        <Button label='*' onClick={this.operation} className='operator' />
                        <Button label='4' onClick={this.buttonClick} className='number' />
                        <Button label='5' onClick={this.buttonClick} className='number' />
                        <Button label='6' onClick={this.buttonClick} className='number' />
                        <Button label='-' onClick={this.operation} className='operator' />
                        <Button label='1' onClick={this.buttonClick} className='number' />
                        <Button label='2' onClick={this.buttonClick} className='number' />
                        <Button label='3' onClick={this.buttonClick} className='number' />
                        <Button label='+' onClick={this.operation} className='operator' />
                        <Button label='0' onClick={this.buttonClick} className='numberZero' />
                        <Button label='.' onClick={this.buttonClick} className='point' />
                        <Button label='=' onClick={this.finalResult} className='result' />
                    </div>
                </div>
            </div>
        )
    }
}
