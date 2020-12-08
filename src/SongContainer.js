import React, { Component } from 'react';
import axios from 'axios';
import SongList from './SongList';
import CreateSongForm from './CreateSongForm';
import { Grid } from 'semantic-ui-react';

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
        process.env.REACT_APP_FLASK_API_URL + '/api/v1/songs/'
      );
      console.log(parsedSongs.data.data);
      await this.setState({
        songs: parsedSongs.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  addSong = async (e, song) => {
    e.preventDefault();
    console.log(song);
    try {
      // The createdSongResponse variable will store the response from the Flask API
      const createdSongResponse = await axios({
        method: 'POST',
        url: process.env.REACT_APP_FLASK_API_URL + '/api/v1/songs/',
        data: song,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // we are emptying all the songs that are living in state into a new array,
      // and then adding the song we just created to the end of it
      // the new song which is called parsedResponse.data
      console.log(createdSongResponse.data.data, ' this is response');
      this.setState({
        songs: [...this.state.songs, createdSongResponse.data.data],
      });
    } catch (err) {
      console.log('error', err);
    }
  };

  deleteSong = async (id) => {
    console.log(id);
    const deleteSongResponse = await axios.delete(
      `${process.env.REACT_APP_FLASK_API_URL}/api/v1/songs/${id}`
    );
    console.log(deleteSongResponse);
    // Now that the db has deleted our item, we need to remove it from state
    // Then make the delete request, then remove the Song from the state array using filter
    this.setState({ songs: this.state.songs.filter((song) => song.id !== id) });
    console.log(deleteSongResponse, ' response from Flask server');
  };


  render() {
    return (    

      <Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
      <Grid.Row>
        <Grid.Column>
          <SongList songs={this.state.songs} deleteSong={this.deleteSong}/>
        </Grid.Column>
        <Grid.Column>
        <CreateSongForm addSong={this.addSong}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>)
  }
}

export default SongContainer