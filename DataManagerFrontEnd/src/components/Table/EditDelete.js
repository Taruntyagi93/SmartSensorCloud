import React, { Component } from "react";

class EditDelete extends Component {
    render() {
        let buttons = null;
        let edit = <button type="button" onClick={this.props.onClickEdit} className="edit btn btn-default" ><span className="glyphicon glyphicon-pencil"></span></button>;
        let deleteB = <button type="button" onClick={this.props.onClickDelete} className="edit btn btn-default" ><span className="glyphicon glyphicon-trash"></span></button>;
        buttons = [edit, deleteB]
      return (
          <div>
          {buttons}
          </div>
      );
    }
  }

export default EditDelete;
