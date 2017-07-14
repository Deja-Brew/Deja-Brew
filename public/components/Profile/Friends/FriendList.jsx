import React, { Component } from 'react';
import axios from 'axios';
import FriendListEntry from './FriendListEntry.jsx';
import FriendAdd from './FriendAdd.jsx';
import QueryFriendInfo from './QueryFriendInfo.jsx';
import EditFriendEntry from './EditFriendEntry.jsx';

export default class FriendList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
    }
    this.FriendAdd=this.handleAddFriend.bind(this);
    this.FriendEdit=this.handleEditFriend.bind(this);
    this.FriendDelete=this.handleDeleteFriend.bind(this);
    this.handleSubmit=this.handleSubmitFriend.bind(this);
    this.handleEditSubmit=this.handleEditSubmit.bind(this);

    };

    componentWillReceiveProps(NextProps) {
    axios.get('/friends/' + NextProps.userId)
    .then((data) => {
      return data.data;
    })
    .then((data) => {
      this.setState({ friendList: data });
    })  
  };

  getFriendData() {
    axios.get('/friends/' + this.props.userId)
    .then((data) => {
      return data.data;
    })
    .then((data) => {
      this.setState({ friendList: data });
    })
  }

  componentWillMount() {
    this.setState({ newFriendQuery: <FriendAdd handleAddFriendClick={ this.FriendAdd } /> })
  }

  handleAddFriend() {
    console.log('inside handle add friend');
    this.setState({ newFriendQuery: <QueryFriendInfo handleSubmit={ this.handleSubmit } /> })
  }

  handleEditFriend(id, idx) {
    let friends = this.state.friendList.slice();
    friends[idx].edit = 1;
    this.setState({ friendList: friends });
    console.log('friend',id,'to be changed', friends);
  }

  handleDeleteFriend(id, idx) {
    console.log('friend',id,'has been selected for termination')
    axios.delete('/friends/' + this.props.userId + '/' + id)
      .then(() => {
        let friends = this.state.friendList.slice();
        friends.splice(idx, 1);
        this.setState({ friendList: friends})
        console.log('ex-friend has been successfully removed')
      })
      .catch((err) => {
        console.log('cannot get rid of your friend', err)
      })
  }

  handleSubmitFriend(friendName, phone) {
    if (friendName === undefined && phone === undefined) {
      this.setState({ newFriendQuery: <FriendAdd handleAddFriendClick={ this.FriendAdd } /> })
    } else {
      axios.put('friends/' + this.props.userId, { name: friendName, phone: '+1 ' + phone })
      .then(() => {
        this.getFriendData();
        this.setState({ newFriendQuery: <FriendAdd handleAddFriendClick={ this.FriendAdd } /> })
      })
    }
  }

  handleEditSubmit(friendName, phone, id, idx) {
    let friends = this.state.friendList.slice();
    friends[idx].edit = 0;
    if (friendName === undefined && phone === undefined) {
      this.setState({ friendList: friends });
    } else {
      axios.put('friends/' + this.props.userId + '?id=' + id, { name: friendName, phone: '+1 ' + phone })
      .then(() => {
      friends[idx].name = friendName;
      friends[idx].phone = '+1 ' + phone;
      this.setState({ friendList: friends });
      })
    }
  }

  render() {
    return (
      <div>Friends List
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            { this.state.friendList.map((friend, i) => 
              (friend.edit === 0 || friend.edit === undefined) ? (
                <FriendListEntry 
                handleEditFriendClick={ this.FriendEdit }
                handleDeleteFriendClick={ this.FriendDelete }
                friend={ friend }
                key={ i } 
                id={ friend.id } 
                idx={ i }/>
              ) : (
                <EditFriendEntry 
                handleEditSubmit={ this.handleEditSubmit }
                key={ i }
                id={ friend.id }
                idx={ i }/>
              )
            )}
          </tbody>
        </table>
        { this.state.newFriendQuery }
      </div>
    );
  }
}