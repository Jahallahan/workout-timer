import React from "react";

class Config extends React.Component {
  changeHandler = (event) => {
    console.log(event.target.value);
    const name = event.target.name;
    const value = Number(event.target.value);

    this.props.updateConfig({ ...this.props.config, [name]: value });
  };

  increaseNumberOfExercises() {
    let numberOfExercises = this.props.config.numberOfExercises;
    this.props.updateConfig({
      ...this.props.config,
      numberOfExercises: numberOfExercises + 1,
    });
  }

  decreaseNumberOfExercises() {
    let numberOfExercises = this.props.config.numberOfExercises;
    this.props.updateConfig({
      ...this.props.config,
      numberOfExercises: numberOfExercises - 1,
    });
  }

  increaseDurationOfExercises() {
    let durationOfExercises = this.props.config.durationOfExercises;
    this.props.updateConfig({
      ...this.props.config,
      durationOfExercises: durationOfExercises + 5,
    });
  }

  decreaseDurationOfExercises() {
    let durationOfExercises = this.props.config.durationOfExercises;
    this.props.updateConfig({
      ...this.props.config,
      durationOfExercises: durationOfExercises - 5,
    });
  }

  increaseDurationOfBreak() {
    let durationOfBreak = this.props.config.durationOfBreak;
    this.props.updateConfig({
      ...this.props.config,
      durationOfBreak: durationOfBreak + 5,
    });
  }

  decreaseDurationOfBreak() {
    let durationOfBreak = this.props.config.durationOfBreak;
    this.props.updateConfig({
      ...this.props.config,
      durationOfBreak: durationOfBreak - 5,
    });
  }

  increaseNumberOfSets() {
    let numberOfSets = this.props.config.numberOfSets;
    this.props.updateConfig({
      ...this.props.config,
      numberOfSets: numberOfSets + 1,
    });
  }

  decreaseNumberOfSets() {
    let numberOfSets = this.props.config.numberOfSets;
    this.props.updateConfig({
      ...this.props.config,
      numberOfSets: numberOfSets - 1,
    });
  }

  increaseBreakBetweenSets() {
    let breakBetweenSets = this.props.config.breakBetweenSets;
    this.props.updateConfig({
      ...this.props.config,
      breakBetweenSets: breakBetweenSets + 5,
    });
  }

  decreaseBreakBetweenSets() {
    let breakBetweenSets = this.props.config.breakBetweenSets;
    this.props.updateConfig({
      ...this.props.config,
      breakBetweenSets: breakBetweenSets - 5,
    });
  }

  render() {
    return (
      <div
        style={{
          maxWidth: "30em",
          margin: "3em auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Exercise Timer</h1>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Exercises</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              style={styles.buttonLarge}
              onClick={this.decreaseNumberOfExercises.bind(this)}
            >
              –
            </button>
            <input
              class="monospace"
              style={styles.inputLarge}
              name="numberOfExercises"
              value={this.props.config.numberOfExercises}
              onChange={this.changeHandler}
            ></input>
            <button
              style={styles.buttonLarge}
              onClick={this.increaseNumberOfExercises.bind(this)}
            >
              +
            </button>
          </div>
          <span style={styles.smallLabel}>Per Set</span>
        </div>
        <div style={{ display: "flex", marginBottom: 50 }}>
          <div style={{ width: "50%" }}>
            <label style={styles.label}>Work</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                style={styles.button}
                onClick={this.decreaseDurationOfExercises.bind(this)}
              >
                –
              </button>
              <input
                class="monospace"
                style={styles.input}
                name="durationOfExercises"
                value={this.props.config.durationOfExercises}
                onChange={this.changeHandler}
              ></input>
              <button
                style={styles.button}
                onClick={this.increaseDurationOfExercises.bind(this)}
              >
                +
              </button>
            </div>
            <span style={styles.smallLabel}>Seconds</span>
          </div>
          <div style={{ width: "50%" }}>
            <label style={styles.label}>Break</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                style={styles.button}
                onClick={this.decreaseDurationOfBreak.bind(this)}
              >
                –
              </button>
              <input
                class="monospace"
                style={styles.input}
                name="durationOfBreak"
                value={this.props.config.durationOfBreak}
                onChange={this.changeHandler}
              ></input>
              <button
                style={styles.button}
                onClick={this.increaseDurationOfBreak.bind(this)}
              >
                +
              </button>
            </div>
            <span style={styles.smallLabel}>Seconds</span>
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: 50 }}>
          <div style={{ width: "50%" }}>
            <label style={styles.label}>Sets</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                style={styles.button}
                onClick={this.decreaseNumberOfSets.bind(this)}
              >
                –
              </button>
              <input
                class="monospace"
                style={styles.input}
                name="numberOfSets"
                value={this.props.config.numberOfSets}
                onChange={this.changeHandler}
              ></input>
              <button
                style={styles.button}
                onClick={this.increaseNumberOfSets.bind(this)}
              >
                +
              </button>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <label style={styles.label}>Break between sets</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                style={styles.button}
                onClick={this.decreaseBreakBetweenSets.bind(this)}
              >
                –
              </button>
              <input
                class="monospace"
                style={styles.input}
                name="breakBetweenSets"
                value={this.props.config.breakBetweenSets}
                onChange={this.changeHandler}
              ></input>
              <button
                style={styles.button}
                onClick={this.increaseBreakBetweenSets.bind(this)}
              >
                +
              </button>
            </div>
            <span style={styles.smallLabel}>Seconds</span>
          </div>
        </div>

        <button style={styles.startButton} onClick={this.props.handleStart}>
          Start
        </button>
      </div>
    );
  }
}

const styles = {
  inputGroup: {
    marginBottom: "2em",
    texAlign: "center",
  },
  label: {
    display: "block",
    fontSize: "1.5em",
    textAlign: "center",
  },
  smallLabel: {
    display: "block",
    fontSize: "0.8em",
    letterSpacing: "0.05em",
    color: "rgba(255,255,255,0.5",
    fontWeight: 600,
    textTransform: "uppercase",
    textAlign: "center",
  },
  inputLarge: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: 80,
    color: "white",
    textAlign: "center",
    width: 100,
    fontWeight: 500,
  },
  buttonLarge: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: 40,
    width: 40,
  },
  input: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: 40,
    color: "white",
    textAlign: "center",
    width: 75,
    fontWeight: 500,
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: 20,
    width: 20,
    cursor: "pointer",
  },

  startButton: {
    borderRadius: 500,
    border: "none",
    padding: "15px 40px",
    color: "white",
    backgroundColor: "#176FF2",
    fontSize: 22,
    display: "block",
    margin: "20px auto",
    cursor: "pointer",
  },
};

export default Config;
