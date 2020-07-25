import React from "react";
import Config from "./Components/Config.js";
import Timer from "./Components/Timer.js";
import Buttons from "./Components/Buttons.js";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import NoSleep from "nosleep.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        numberOfExercises: 10,
        durationOfExercises: 45,
        durationOfBreak: 15,
        numberOfSets: 3,
        breakBetweenSets: 60,
      },
      isRunning: false,
      isPaused: false,
      currentProgressTimer: 0,
      currentExercise: "",
      timestamps: {},
      isMuted: false,
    };
  }
  noSleep = new NoSleep();

  updateConfig(config) {
    this.setState({ config: config });
  }

  handleStart() {
    this.setState({ isRunning: true });
    this.generateTimestamps();
    this.noSleep.enable();
  }

  handleStop() {
    this.setState({ isRunning: false });
    this.noSleep.disable();
  }

  toggleMute() {
    if (this.state.isMuted) {
      this.setState({
        isMuted: false,
      });
    } else {
      this.setState({
        isMuted: true,
      });
    }
  }

  generateTimestamps() {
    const now = moment();
    console.log(now);

    const config = this.state.config;

    let activityTimestamps = [];
    let totalTimeOfActivity =
      config.durationOfExercises + config.durationOfBreak;
    let totalTimeOfSet =
      totalTimeOfActivity * (config.numberOfExercises - 1) +
      config.durationOfExercises +
      config.breakBetweenSets;
    let totalTime =
      totalTimeOfSet * config.numberOfSets - config.breakBetweenSets;
    let overallEndingTime = moment(now).add(moment.duration(totalTime, "s"));
    console.log(
      totalTimeOfActivity,
      totalTimeOfSet,
      overallEndingTime.format("h:mm:ss")
    );
    let n;
    for (n = 0; n < config.numberOfSets; n++) {
      // Loop through each set
      let i;
      for (i = 0; i < config.numberOfExercises; i++) {
        //Loop theough each activity in each set
        let name = "Exercise " + (i + 1);
        let startTime = moment(now).add(
          moment.duration(n * totalTimeOfSet + i * totalTimeOfActivity, "s")
        );

        let endTime = moment(
          startTime + moment.duration(config.durationOfExercises, "s")
        );

        activityTimestamps.push({
          type: "exercise",
          name: name,
          set: "Set " + (n + 1),
          startTime: startTime,
          endTime: endTime,
        });
        // If it's not the last exercise, add a break
        if (i < config.numberOfExercises - 1) {
          let breakEndTime = moment(
            endTime + moment.duration(config.durationOfBreak, "s")
          );
          activityTimestamps.push({
            type: "rest",
            name: "Rest",
            set: "Set " + (n + 1),
            startTime: endTime,
            endTime: breakEndTime,
          });
        }
      }
      if (n < config.numberOfSets - 1) {
        let restStartTime =
          now +
          moment.duration(
            (n + 1) *
              (config.durationOfExercises * config.numberOfExercises +
                config.durationOfBreak * (config.numberOfExercises - 1)) +
              config.breakBetweenSets * n,
            "s"
          );
        let restEndTime =
          restStartTime + moment.duration(config.breakBetweenSets, "s");
        activityTimestamps.push({
          set: "End of set " + (n + 1),
          type: "restBetweenSets",
          name: "Rest",
          startTime: restStartTime,
          endTime: restEndTime,
        });
      }
    }

    this.setState({
      timestamps: {
        startTime: now,
        overallEndingTime: overallEndingTime,
        activityTimestamps: activityTimestamps,
      },
    });
  }

  render() {
    return !this.state.isRunning ? (
      <Config
        config={this.state.config}
        updateConfig={this.updateConfig.bind(this)}
        handleStart={this.handleStart.bind(this)}
      />
    ) : (
      <div>
        <Timer
          config={this.state.config}
          isRunning={this.state.isRunning}
          isPaused={this.state.isPaused}
          timestamps={this.state.timestamps}
          isMuted={this.state.isMuted}
        />
        <Buttons
          isMuted={this.state.isMuted}
          toggleMute={this.toggleMute.bind(this)}
          handleStop={this.handleStop.bind(this)}
        />
      </div>
    );
  }
}

export default App;
