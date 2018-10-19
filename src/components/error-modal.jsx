import * as React from 'react';
import { connect } from 'react-redux';
import Modal from './modal';
import { ActionCreators as modalActionCreators, modalNames } from '../store/modal/reducer';

const mapStateToProps = state => ({
  errors: state.network.errors,
});

const dispatchToProps = {
  closeModal: modalActionCreators.closeModal.create,
};

class ErrorModal extends React.Component {
  render() {
    const { closeModal, errors } = this.props;
    return (
      <Modal {...this.props} name={modalNames.errorModal}>
        <div className="gloot-modal-topbar">
          <h1>Network error</h1>
        </div>
        <div className="gloot-modal-content">
          {errors &&
            errors.length &&
            errors.map((error, i) => (
              <div className="" key={i}>
                <h2 className="">{error.error}</h2>
                <table className="">
                  <tbody>
                    <tr>
                      <td>timestamp: </td>
                      <td>{error.timestamp}</td>
                    </tr>
                    <tr>
                      <td>path: </td>
                      <td>{error.path || error.url}</td>
                    </tr>
                    <tr>
                      <td>status: </td>
                      <td>
                        {error.status} {error.statusText || ''}
                      </td>
                    </tr>
                    <tr>
                      <td>message: </td>
                      <td>{error.message || error.description}</td>
                    </tr>
                  </tbody>
                </table>
                {i !== errors.length -1 && <hr />}
              </div>
            ))}
        </div>
        <div className="gloot-modal-buttonset">
          <button onClick={closeModal}>close</button>
        </div>
      </Modal>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(ErrorModal);
