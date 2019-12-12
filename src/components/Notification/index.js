import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';

class Notification extends Component {

   render() {
      const { notifications } = this.props;

      return (
         <Notifications
            notifications={notifications}
         />
      );
   }
}

Notification.propTypes = {
   notifications: PropTypes.array
};

export default connect(
   state => ({ notifications: state.notifications })
)(Notification);