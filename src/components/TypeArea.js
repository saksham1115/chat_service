import React from 'react';
import styles from '../../public/css/index.sass';

export default class TypeArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) { 
        let event = e.nativeEvent;

        if(event.inputType !== undefined) {
            if(event.inputType == "insertLineBreak") {
                this.sendMessage();
            } else {
                this.setState({
                    value: event.target.value
                });
            }
        } else {
            console.log(event);
        }
    }

    sendMessage() {
        this.props.sendMessage(this.state.value);
        this.setState({value: ""});
    }

    render() {
        return (
            <div className={styles["chat__textarea"]}>
                <textarea value={this.state.value} onInput={this.handleInput}>
                </textarea>
            </div>
        );
    }
}