import React, { Component } from 'react';
import { Consumer } from '../Context';
import { Modal, Image, Header, Button, Icon } from 'semantic-ui-react';
import './BookNowModal.css';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import VerificationModal from './VerificationModal';

class NestedBookNowModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <Modal
              open={this.state.open}
              onOpen={this.open}
              onClose={() => {
                this.close();
                value.handleBookNowModalClose();
              }}
              size="small"
              trigger={
                <Button icon="check" content="Book" className="book-now-modal-book-button" onClick={value.bookTour} />
              }
            >
              <Modal.Header>All Booked!</Modal.Header>
              <Modal.Content>
                <p>That's everything!</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  icon="check"
                  content="All Done"
                  onClick={() => {
                    this.close();
                    value.handleBookNowModalClose();
                  }}
                />
              </Modal.Actions>
            </Modal>
          );
        }}
      </Consumer>
    );
  }
}

export default class BookNowModal extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          return value.verified === false ? (
            <VerificationModal />
          ) : (
            <Modal
              dimmer="inverted"
              trigger={
                <span className="adventure-details-view-now-button" onClick={value.handleBookNowModalOpen}>
                  <span className="adventure-details-view-now-button-text">Book now</span>
                </span>
              }
              open={value.bookNowModalOpen}
              onClose={value.handleBookNowModalClose}
            >
              <Modal.Header>
                <div>
                  <h2>Book {value.selectedTourToView.name}</h2>
                </div>
              </Modal.Header>
              <Modal.Content image>
                <Image wrapped size="large" src={value.selectedTourToView.images[0].source_url} />
                <Modal.Description>
                  <Header>Enter your desired date</Header>
                  <div>
                    <SemanticDatepicker />
                  </div>
                  <Header>
                    <Icon name="add user" />
                    Particpants
                  </Header>

                  <div>
                    <span className="participant-number-btn" onClick={value.decrementParticipantCount}>
                      -
                    </span>
                    <span className="participant-number-btn">{value.tourParticipantCount}</span>
                    <span className="participant-number-btn" onClick={value.incrementParticipantCount}>
                      +
                    </span>
                  </div>
                </Modal.Description>

                <br />
              </Modal.Content>
              <Modal.Actions>
                <span className="book-now-modal-total-price">
                  {value.totalTourCost} {value.selectedTourToView.price.currency}
                </span>
                <NestedBookNowModal />
              </Modal.Actions>
            </Modal>
          );
        }}
      </Consumer>
    );
  }
}
