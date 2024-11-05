import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  };
  activaiteEditMode = () => {
    this.setState({
      editMode: true
    });
  };

  deactivaiteEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.target.value
    });
  };

  componentDidUpdate(prevState, prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
    console.log("componetnDidUpdate");
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activaiteEditMode}>
              {this.props.status || "--"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              value={this.state.status}
              onBlur={this.deactivaiteEditMode}
              autoFocus={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
