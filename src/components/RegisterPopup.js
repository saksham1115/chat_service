import React from 'react';
import styles from '../../public/css/index.sass';

export default class RegisterPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            name: ""
        }

        this.closePopup = this.closePopup.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) { 
        let event = e.nativeEvent;
        this.setState({
            name: event.target.value
        });
    }

    closePopup() {
        this.setState({
            visible: false
        });
        this.props.register(this.state.name);
    }
    
    render() {
        return (
            this.state.visible ? (
                <div className={styles["popup-container"]}>
                    <div className={styles.popup}>
                        Your name:
                        <input type="text" value={this.state.name} onInput={this.handleInput}/>
                        <button onClick={this.closePopup}>Enter</button>
                    </div>
                </div>
              ) : (
                <div></div>
              )
        );
    }
}