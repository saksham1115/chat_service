import React from "react";
import styles from '../../public/css/index.sass';

export default class MessageArea extends React.Component {
    componentDidUpdate() {
        this.messageList.scrollTop = this.messageList.scrollHeight;
    }

    componentDidMount() {
        this.messageList.scrollTop = this.messageList.scrollHeight;
    }

    render() {
        return (
            <div className={styles["chat__messages"]} ref={(el) => this.messageList = el }>
                {
                    this.props.messages.map(
                        (m, i) => {
                            let message = null;
                            if(m.type === 'message') {
                                return ( <Message user={m.user} date={m.date} message={m.message} key={m.user + "_" + i} /> )
                            } else {
                                return ( <Notification message={m.message} key={i}/>)
                            }
                        }
                    )
                }
            </div>
        );
    }
}

function Message(props) {
    return (
        <div className={styles.message}>
            <div className={styles.message__left}>
                <div className={styles.message__username}>{props.user}</div>
                <div className={styles.message__text}>
                    {
                        props.message.split('<br>').map((s, i) =>  <div key={i}>{s}</div>)
                    }
                </div>
            </div>
            <div className={styles.message__date}>
                <div>{props.date[0]}</div>
                <div>{props.date[1]}</div>
            </div>
        </div>
    );
}

function Notification(props) {
    return (
        <div className={styles.notification}>
            {props.message}
        </div>
    );
}