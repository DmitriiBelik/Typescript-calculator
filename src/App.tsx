/* eslint-disable react-hooks/exhaustive-deps */
import './index.css'
import { useState, useEffect } from 'react'

function App() {
    const [result, setResult] = useState<string>('')
    const [firstDigit, setFirstDigit] = useState<string>('')
    const [secondDigit, setSecondDigit] = useState<string>('')
    const [operation, setOperation] = useState<string>('')
    const [history, setHistory] = useState<string>('')
    const digits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    const ops: string[] = ['/', '×', '+', '-', '%', '√', 'C', '=']
    const clearAll = () => {
        setResult('')
        setFirstDigit('')
        setSecondDigit('')
        setOperation('')
        setHistory('')
    }

    useEffect(() => {
        if (operation !== '=') {
            setResult(result + operation)
        } else {
            setResult((+firstDigit).toFixed(6))
            setSecondDigit('')
            setHistory(history + firstDigit)
        }
    }, [operation])

    useEffect(() => {
        setResult(result + secondDigit)
    }, [secondDigit])

    const updateCalc = (value: string) => {
        if (digits.includes(value)) {
            if (secondDigit === '' && operation === '') {
                setFirstDigit(firstDigit + value)
                setResult(firstDigit + value)
                setHistory(history + value)
            } else {
                setSecondDigit(secondDigit + value)
                setHistory(history + value)
            }
        }

        if (ops.includes(value)) {
            setOperation(value)
            setHistory(history + value)
            if (value === '=') {
                switch (operation) {
                    case '+':
                        setFirstDigit((+firstDigit + +secondDigit).toString())
                        break
                    case '-':
                        setFirstDigit((+firstDigit - +secondDigit).toString())
                        break
                    case '×':
                        setFirstDigit((+firstDigit * +secondDigit).toString())
                        break
                    case '/':
                        setFirstDigit((+firstDigit / +secondDigit).toString())
                        break
                    case '%':
                        setFirstDigit((+firstDigit % +secondDigit).toString())
                        break
                }
            }
            if (value === '√') {
                setOperation('')
                setResult(
                    Math.sqrt(+firstDigit)
                        .toFixed(6)
                        .toString(),
                )
            }
        }
    }
    return (
        <div className='App'>
            <div className='calc-wrapper'>
                <div className='calculator'>
                    <div className='operations-display'>{history}</div>
                    <div className='result-display'>{result}</div>
                    <div className='display-line'></div>
                    <div className='buttons-wrapper'>
                        <div className='buttons-line'>
                            <div className='button' onClick={() => clearAll()}>
                                C
                            </div>
                            <div className='button' onClick={() => updateCalc('√')}>
                                √
                            </div>
                            <div className='button' onClick={() => updateCalc('%')}>
                                %
                            </div>
                            <div className='button' onClick={() => updateCalc('/')}>
                                /
                            </div>
                        </div>
                        <div className='buttons-line'>
                            <div className='button' onClick={() => updateCalc('7')}>
                                7
                            </div>
                            <div className='button' onClick={() => updateCalc('8')}>
                                8
                            </div>
                            <div className='button' onClick={() => updateCalc('9')}>
                                9
                            </div>
                            <div className='button' onClick={() => updateCalc('×')}>
                                ×
                            </div>
                        </div>
                        <div className='buttons-line'>
                            <div className='button' onClick={() => updateCalc('4')}>
                                4
                            </div>
                            <div className='button' onClick={() => updateCalc('5')}>
                                5
                            </div>
                            <div className='button' onClick={() => updateCalc('6')}>
                                6
                            </div>
                            <div className='button' onClick={() => updateCalc('-')}>
                                -
                            </div>
                        </div>
                        <div className='buttons-line'>
                            <div className='button' onClick={() => updateCalc('1')}>
                                1
                            </div>
                            <div className='button' onClick={() => updateCalc('2')}>
                                2
                            </div>
                            <div className='button' onClick={() => updateCalc('3')}>
                                3
                            </div>
                            <div className='button' onClick={() => updateCalc('+')}>
                                +
                            </div>
                        </div>
                        <div className='buttons-line'>
                            <div className='button' onClick={() => updateCalc('00')}>
                                00
                            </div>
                            <div className='button' onClick={() => updateCalc('0')}>
                                0
                            </div>
                            <div className='button' onClick={() => updateCalc('.')}>
                                ,
                            </div>
                            <div className='button result' onClick={() => updateCalc('=')}>
                                =
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
