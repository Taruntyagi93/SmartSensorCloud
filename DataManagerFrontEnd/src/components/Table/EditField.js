import React, { Component } from "react";

class EditField extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editField: this.props.field.value
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
      this.setState({
        editField: e.target.value
      });
      this.props.sendValueToParent(this.props.field.name, e.target.value);
    }
    render() {
      return (
        <td>
          <input
            className="form-control input-sm"
            type="text"
            value={this.state.editField}
            onChange={this.handleChange}>
          </input>
        </td>
      );
    }
  }

  export default EditField;
