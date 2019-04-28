import React from "react";
import ReactDOM from "react-dom";
import { Navbar, Nav, NavItem, Grid, Row, Col, FormGroup, InputGroup, FormControl, Button, Table, Modal,ModalDialog } from 'react-bootstrap';

class Example extends React.Component {
        constructor(props, context) {
          super(props, context);
          
          this.handleShow = this.handleShow.bind(this);
          this.handleClose = this.handleClose.bind(this);
          this.state = {
            show: true,
            title: this.props.movie.title,
            text: this.props.movie.overview

          };
        }
      
        handleClose() {
          this.setState({ show: false });
          ReactDOM.unmountComponentAtNode(document.getElementById('modal'));
        }
      
        handleShow() {
          this.setState({ show: true });
        }
      
        render() {
          return (
            <div>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.text}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )
        }
      }
export default Example;
