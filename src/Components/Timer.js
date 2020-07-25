import React from "react";

import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import Sound from "react-sound";
import beeps from "../Assets/beeps.mp3";

momentDurationFormatSetup(moment);

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTimeRemaining: null,
      overallTimePercentage: 0,
      activityTimeRemaining: moment
        .duration(
          moment(this.props.timestamps.activityTimestamps[0].endTime).diff(
            this.props.timestamps.activityTimestamps[0].endTime.startTime
          )
        )
        .format("mm:ss", { trim: false }),
      activityTimePercentage: 0,
      currentActivity: this.props.timestamps.activityTimestamps[0],
      nextActivity: this.props.timestamps.activityTimestamps[1],
      playBeeps: false,
      progressBarReset: true,
    };
  }

  componentDidMount() {
    this.updateDisplay();
    this.setState({ progressBarReset: true });
    if (this.props.isRunning) {
      this.interval = setInterval(() => {
        this.updateDisplay();
      }, 1000);
    }
  }

  updateDisplay() {
    let timestamps = this.props.timestamps;
    let now = moment();
    // If the whole session should have finished, stop
    if (timestamps.overallEndingTime < now) {
      this.props.handleStop();
    } else {
      //Otherwise
      // Update the total time remaining and percentage
      let totalTimeRemaining = moment.duration(
        moment(timestamps.overallEndingTime).diff(now)
      );
      let overallTimePercentage =
        (1 -
          moment.duration(
            moment(timestamps.overallEndingTime).diff(now) /
              moment.duration(
                moment(timestamps.overallEndingTime).diff(timestamps.startTime)
              )
          )) *
        100;
      this.setState({
        totalTimeRemaining: totalTimeRemaining,
        overallTimePercentage: overallTimePercentage,
      });
      //Check if current activity has finished
      let currentActivity = this.state.currentActivity;
      if (moment(currentActivity.endTime).isBefore(now)) {
        //If it has finished, find the next activity
        let i;
        let activityTimes = this.props.timestamps.activityTimestamps;
        for (i = 0; i < activityTimes.length; i++) {
          if (
            moment(activityTimes[i].startTime).isBefore(now) &&
            moment(activityTimes[i].endTime).isAfter(now)
          ) {
            this.setState({
              currentActivity: activityTimes[i],
              nextActivity: activityTimes[i + 1]
                ? activityTimes[i + 1]
                : { name: "Finish" },
              progressBarReset: true,
            });
          }
        }
      } else {
        this.setState({ progressBarReset: false });
      }
      let activityTimeRemaining = moment.duration(
        moment(this.state.currentActivity.endTime).diff(now)
      );
      let activityTimePercentage =
        (1 -
          moment.duration(
            moment(this.state.currentActivity.endTime).diff(now)
          ) /
            moment.duration(
              moment(this.state.currentActivity.endTime).diff(
                this.state.currentActivity.startTime
              )
            )) *
        100;

      if (activityTimeRemaining < 3000) {
        console.log(activityTimeRemaining);
        this.setState({ playBeeps: true });
      }
      this.setState({
        activityTimeRemaining: activityTimeRemaining.format("mm:ss", {
          trim: false,
        }),
        activityTimePercentage: activityTimePercentage,
      });
    }
  }

  endBeeps() {
    this.setState({ playBeeps: false });
  }

  render() {
    let currentActivityDuration =
      moment
        .duration(
          moment(this.state.currentActivity.endTime).diff(
            this.state.currentActivity.startTime
          )
        )
        .asSeconds() - 1;
    return (
      <div>
        {this.state.playBeeps && (
          <div>
            <Sound
              url={beeps}
              playStatus={Sound.status.PLAYING}
              volume={this.props.isMuted ? 0 : 100}
              onFinishedPlaying={this.endBeeps.bind(this)}
              autoLoad={true}
            />
          </div>
        )}
        <div
          style={{
            backgroundColor:
              this.state.currentActivity.type === "exercise"
                ? "#19A763"
                : "#2358A7",
            position: "relative",
            height: "95vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: this.state.progressBarReset ? 0 : "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              backgroundColor:
                this.state.currentActivity.type === "exercise"
                  ? "#22CA7A"
                  : "#176FF2",
              transition: this.state.progressBarReset
                ? " "
                : "width " + currentActivityDuration + "s linear",
            }}
          />
          {this.state.currentActivity.set && (
            <span
              style={{
                fontSize: "4vw",
                zIndex: 9999,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {this.state.currentActivity.set}
            </span>
          )}
          <div
            class="monospace"
            style={{
              fontSize: "30vw",
              fontWeight: 500,
              color: "white",
              textAlign: "center",
              zIndex: 9999,
              marginTop: "-2vw",
            }}
          >
            {this.state.activityTimeRemaining}
          </div>
          <div
            style={{
              color: "white",
              fontSize: "8vw",
              zIndex: 999,
            }}
          >
            {this.state.currentActivity.name}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "5vh",
            backgroundColor: "#2C3137",
          }}
        >
          <div
            style={{
              width: this.state.overallTimePercentage + "%",
              transition: "width 1s linear",
              backgroundColor: "#49515E",
              height: "100%",
            }}
          ></div>
        </div>
      </div>
    );
  }
}
export default Timer;
