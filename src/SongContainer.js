import React, { Component } from 'react';
import axios from 'axios';
import SongList from './SongList';

class SongContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      songs: []
    }
  }
  componentDidMount(){
    this.getSongs();
  }
  getSongs = async () => {
    try {
      const parsedSongs = await axios(
          //process.env.REACT_APP_FLASK_API_URL + '/api/v1/songs/'
        'http://localhost:8000/api/v1/songs/'
      );
      console.log(parsedSongs.data.data);
      await this.setState({
        songs: parsedSongs.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return <SongList songs={this.state.songs} />;
  }
}

export default SongContainer