import React from "react";
import styles from '../../public/css/index.sass';
import MessageArea from './MessageArea.js';
import UserList from './UserList.js';
import TypeArea from './TypeArea.js';
import RegisterPopup from './RegisterPopup.js';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: "You",
            messages: [{
                type: 'notification',
                message: '~ Welcome! ~'
            }],
            users: []
        }

        /* Methods */
        this.configSocket = this.configSocket.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.notify = this.notify.bind(this);
        this.addUserToList = this.addUserToList.bind(this);
        this.removeUserFromList = this.removeUserFromList.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.getOnlineUsers = this.getOnlineUsers.bind(this);

        /* Socket listeners */
        this.client = this.configSocket();

    }

    configSocket() {
        let client = io();

        client.on('getOnlineUsers', (users) => {
            this.getOnlineUsers(users);
        });
        client.on('receiveMessage', (msg) => {
            this.receiveMessage(msg);
        });
        client.on('receiveUser', (username) => {
            this.addUserToList(username);
            this.notify('~ '+ username + ' is online. ~');
        });
        client.on('sayGoodbye', (username) => {
            if(username !== null) {
                this.removeUserFromList(username);
                this.notify('~ '+ username + ' went offline. ~');
            }
        });

        return client;
    }

    registerUser(username) {
        this.client.emit('userHasRegistered', username);
        this.setState({
            currentUser: username
        });
        
    }

    sendMessage(newMessage) {
        let now = new Date();

        let newMsg = {
            user: this.state.currentUser,
            message: newMessage,
            date: [now.toLocaleTimeString(), now.toLocaleDateString()],
            type: 'message'
        };

        this.client.emit('userSentMessage', newMsg);

        this.receiveMessage(newMsg);
    }

    receiveMessage(msg) {
        let lastIndex = this.state.messages.length - 1;
        let lastMessage = this.state.messages[lastIndex];

        if(msg.type === 'message' && msg.user === lastMessage.user) {
            lastMessage.message += '<br>' + msg.message;
            lastMessage.date = msg.date;

            this.setState(prevState => {
                /* appends new message to previous message */
                prevState.messages[lastIndex] = lastMessage;
                return ({
                    messages: prevState.messages
                });
            });

        } else {
            this.setState((prevState) => ({
                messages: prevState.messages.concat(msg)
            }));
        }
    }

    addUserToList(username) {
        this.setState((prevState) => ({
            users: prevState.users.concat(username)
        }));
    }

    removeUserFromList(username) {
        let _users = this.state.users;
        if(_users.indexOf(username) >= 0) {
            _users.splice(_users.indexOf(username),1);

            this.setState({
                users: _users
            });
        }        
    }

    getOnlineUsers(userList) {
        this.setState({
            users: userList
        });
    }

    notify(message) {
        let notif = {
            type: 'notification',
            message: message
        };
        this.setState({
            messages: this.state.messages.concat([notif])
        });
    }

    render() {
        return (
            <main className={styles["chat-container"]}>
                <aside className={styles["chat__users"]}>
                    <UserList users={this.state.users} />
                </aside>
                <section className={styles["chat__main"]}>
                    <MessageArea messages={this.state.messages} />
                    <TypeArea sendMessage={this.sendMessage}/>
                </section>
                <RegisterPopup register={this.registerUser} />
            </main>
        )
    }
}