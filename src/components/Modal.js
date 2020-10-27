import React from 'react';
import { connect } from 'react-redux';

import { clearDbMsg } from '../actions/dbMsgActions';

const Modal = (props) => (
  <div className="modal">
    <div className="popup">
      <div className="popup-message">
        <span>
          {props.message}
        </span>
      </div>
      <div className="input-submit">
        <button
          onClick={() => {props.dispatch(clearDbMsg())}}
        >
          OK
        </button>
      </div>
    </div>
  </div>
);

const mapStateToProps = (({ dbMsg }) => ({
  message: dbMsg.msgText
}));

export default connect(mapStateToProps)(Modal);
