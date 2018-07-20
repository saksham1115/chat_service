import React from "react";
import styles from '../../public/css/index.sass';

export default function UserList(props) {
    return (
        <div>
            <div className="chat__users__title font14">{"Online users (" + props.users.length + ")"}</div>
            <div className="user-label__container">
                {
                    props.users.map(
                        (u, i) => <UserLabel username={u} key={u + "_" + i}/>
                    )
                }
            </div>
        </div>

    );
}

function UserLabel(props) {
    return (
        <div className="user-label">
            <UserBlob color="#386f7b" /> {props.username}
        </div>
    );
}

function UserBlob(props) {
    return (
        <div className="user-blob" style={{backgroundColor: props.color}} />
    );
}