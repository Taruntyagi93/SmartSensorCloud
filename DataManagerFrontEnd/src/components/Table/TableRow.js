import React, { Component } from "react";
import EditField from './EditField';
import ConfirmCancel from './ConfirmCancel';
import EditDelete from './EditDelete';

class TableRow extends Component {
    constructor(props) {
      super(props);

      this.clickEdit = this.clickEdit.bind(this);
      this.clickEditExit = this.clickEditExit.bind(this);
      this.clickDelete = this.clickDelete.bind(this);
      this.clickEditConfirm = this.clickEditConfirm.bind(this);
      this.updateData = this.updateData.bind(this);

      var editMode = false;
      var added = false;
      if (!this.props.instance.name) {
        editMode = true;
        added = true;
      }
      var instance = {};
      this.props.fielddata.forEach(function(fd) {
        instance[fd.name] = this.props.instance[fd.name];
      }, this);
      this.state = {
        editMode: editMode,
        instance: instance,
        revised_instance: instance,
        deleted: false,
        added: added,
      };
    }

    clickEdit() {
      this.setState({ editMode: true });
    }

    clickEditExit() {
      this.setState({ editMode: false });
      this.setState({
        revised_instance: this.state.instance
      });
      if (this.state.added) {
        this.setState({deleted: true});
      }
    }

    clickDelete() {
      this.setState({deleted:true});
    }

    clickEditConfirm() {
      this.setState({
        editMode: false,
        instance: this.state.revised_instance
      });
      if (this.state.added) {
      }
      else {
        this.setState({added:false});
      }
    }

    updateData(key, value) {
      var temp_revised_instance = this.state.revised_instance;
      temp_revised_instance[key] = value;
      this.setState({
        revised_instance: temp_revised_instance
      });
    }

    render() {
      let row = [];
      let buttons = null;
      if (this.state.deleted) {
        return <tr></tr>;
      }
      if (this.state.editMode) {
        buttons = <ConfirmCancel onClickConfirm={this.clickEditConfirm} onClickCancel={this.clickEditExit} />;
        this.props.fielddata.forEach(function(fd) {
          var field = {
            name : fd.name,
            value : this.state.instance[fd.name]
          };
          if (fd.inputfield) {
            row.push(<EditField field={field} key={field.name} sendValueToParent={this.updateData}/>);
          } else {
            row.push(<td></td>)
          }
        }, this);
      } else {
        buttons = <EditDelete onClickEdit={this.clickEdit} onClickDelete={this.clickDelete} />;
        this.props.fielddata.forEach(function(fd) {
          var field = {
            name: fd.name,
            value: this.state.instance[fd.name]
          };
          row.push(<td onClick={this.handleSelectRow}>{field.value}</td>);
        }, this);
      }
      if (this.props.instance.selected) {
        return (
          <tr className="success">
            {row}
            <div className="btn-group btn-group-sm">
              {buttons}
            </div>
        </tr>
        );
      } else {
        return (
          <tr>
              {row}
              <div className="btn-group btn-group-sm">
                {buttons}
              </div>
          </tr>
        );
      }
    }
  }

  export default TableRow;
