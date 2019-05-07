import React, { Component } from "react";
import TableRow from './TableRow';

class TableContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        addMode: false
      };
    }

    render() {
      if (this.state.addMode) {
        var instance = {};
        this.props.data.fielddata.forEach(function(dataPoint) {
          instance[dataPoint.name] = "";
        });
        var dataout = this.props.data;
        dataout.instances.push(instance);
      }
      else {
        dataout = this.props.data;
      }
      return (
          <div className="table-responsive">
            <legend>{this.props.title}</legend>
            <table className="table table-striped">
              <thead>
                  <tr>
                      {dataout.fielddata.map((fd) => {
                          return (
                              <th>{fd.header}</th>
                          )
                      })}
                      <th className="buttoncolumn">Edit or Delete</th>
                  </tr>
              </thead>
              <tbody>
                {dataout.instances.map((instance) => {
                    return (
                        <TableRow instance={instance} fielddata={dataout.fielddata} />
                    )
                })}
              </tbody>
            </table>
            <br/>
            <button type="button" onClick={() => this.setState({ addMode: true })} className="btn btn-default btn-block" >Add Node</button>
        </div>
      );
    }
  }

export default TableContainer;
