
import React from "react";

const UserProfile = (props) => {
    return (
        <div>
            <h1>Username: {props.user.username}</h1>
            <p>Email: {props.user.email}</p>
            <p>First Name: {props.user.firstName}</p>
            <p>Last Name: {props.user.lastName}</p>
            <p>Bio: {props.user.bio}</p>
            <p>Linked Accounts</p>
            <p>Youtube: NOT LINKED</p>
            <p>Steam: NOT LINKED</p>
            <p>Riot Games: NOT LINKED</p>
            <p>Ubisoft: NOT LINKED</p>
            <p>Twitch: NOT LINKED</p>
            <p>MyAnimeList: NOT LINKED</p>
            <p>Discord: NOT LINKED</p>
            <p>Battle.net: NOT LINKED</p>
            <p>Epic Games: NOT LINKED</p>
        </div>
    )
}

export default UserProfile;