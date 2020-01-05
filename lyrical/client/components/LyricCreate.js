import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: ''};
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { 
        songId: this.props.songId,
        content: this.state.content
      }
    }).then(() => {
      console.log('added');
      this.setState({content: ''});
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input value={this.state.content} onChange={event => this.setState({ content: event.target.value })}/>
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($songId: ID, $content: String){
    addLyricToSong(
      songId: $songId, 
      content: $content
    ) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);