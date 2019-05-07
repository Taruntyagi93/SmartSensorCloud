import React, { Component } from "react";

class ConfirmCancel extends Component {
    render() {
        let buttons = null;
        let confirm = <button type="button" onClick={this.props.onClickConfirm} className="edit btn btn-default btn-success" ><span className="glyphicon glyphicon-ok"></span></button>;
        let exit = <button type="button" onClick={this.props.onClickCancel} className="edit btn btn-default btn-danger" ><span className="glyphicon glyphicon-remove"></span></button>;
        buttons = [confirm, exit];
      return (
          <div>
          {buttons}
          </div>
      );
    }
  }

export default ConfirmCancel;
