import React from "react";

class Buttons extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: "2vw",
          right: "2vw",
        }}
      >
        <span
          onClick={this.props.toggleMute}
          style={{
            fontSize: "2.7vw",
            cursor: "pointer",
          }}
        >
          {this.props.isMuted ? "🔕" : "🔔"}
        </span>
        <span
          onClick={this.props.handleStop}
          style={{
            fontSize: "2.5vw",
            marginLeft: "2vw",
            cursor: "pointer",
          }}
        >
          ❌
        </span>
      </div>
    );
  }
}

export default Buttons;
