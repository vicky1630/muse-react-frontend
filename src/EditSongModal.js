import React from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

const EditSongModal = (props) => {
  console.log(props);

  return (
    <Modal open={props.open}>
      <Header>Edit Song</Header>
      <Modal.Content>
        <Form onSubmit={props.closeAndEdit}>
          <Label>Title:</Label>
          <Form.Input
            type="text"
            name="title"
            value={props.songToEdit.title}
            onChange={props.handleEditChange}
          />
          <Label>Artist:</Label>
          <Form.Input
            type="text"
            name="artist"
            value={props.songToEdit.artist}
            onChange={props.handleEditChange}
          />
          <Label>Album:</Label>
          <Form.Input
            type="text"
            name="album"
            value={props.songToEdit.album}
            onChange={props.handleEditChange}
          />
          <Modal.Actions>
            <Button color="green" type="submit">
              Edit Song
            </Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditSongModal;