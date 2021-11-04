import React, { Component } from 'react'
import './Lottery.css';
import Ball from './Ball'

class Lottery extends Component {
    static defaultProps = {
        title: 'Lotto',
        numBalls: 6,
        maxNum: 40
    }

    constructor(props) {
        super(props)
        this.state = { nums: Array.from({ length: this.props.numBalls }) }
        this.handleClick = this.handleClick.bind(this)
    }

    generate() {
        // 方法1
        // 不能将随机号码用variable randNum 保存起来后再使用map
        // 这样得到的是重复的号码，因为randNum虽然产生随机号码，
        // 但是pass进map的时候是将该随机号码pass进去，而不是再继续产生随机号码
        // ---以下这行是错误的---
        // const randNum = Math.floor(Math.random() * this.props.maxNum) + 1
        // ---以上这行是错误的---

        // const newNum = this.state.nums.map(n => Math.floor(Math.random() * this.props.maxNum) + 1)
        // return { nums: [...newNum] }

        // 方法2
        // 以下使用while loop产生不重复码号的array
        let newNums = []
        while (newNums.length < this.state.nums.length) {
            let randNum = Math.floor(Math.random() * this.props.maxNum) + 1
            if (!newNums.includes(randNum)) {
                newNums.push(randNum)
            }
        }
        return { nums: newNums }
    }

    handleClick() {
        this.setState(this.generate)
    }

    render() {
        return (
            <div className="Lottery">
                <h2>{this.props.title}</h2>
                <div className="Lottery-balls">
                    {
                        this.state.nums.map(n => <Ball num={n} />)
                    }
                </div>
                <button onClick={this.handleClick}>Generate</button>
            </div>
        )
    }
}

export default Lottery