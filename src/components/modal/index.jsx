import * as React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import './modal.sass';

const mapStateToProps = state => ({modalName: state.modal.name});
class ModalComponent extends React.Component {
  render() {
    return <Modal
        {...this.props}
        isOpen={this.props.name === this.props.modalName}
        className={`gloot-modal ${this.props.className}`}
        overlayClassName="gloot-modal-overlay"
        ariaHideApp={false}
        contentLabel="Modal">
    </Modal>
  }
}
export default connect(mapStateToProps)(ModalComponent);