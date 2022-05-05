import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";


const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewType: "Week",
      durationBarVisible: false
    };
  }

  componentDidMount() {

    // load event data
    this.setState({
      startDate: "2022-03-07",
      events: [
        {
          id: 1,
          text: "Event 1",
          start: "2022-03-07T10:30:00",
          end: "2022-03-07T13:00:00"
        },
        {
          id: 2,
          text: "Event 2",
          start: "2022-03-08T09:30:00",
          end: "2022-03-08T11:30:00",
          backColor: "#6aa84f"
        },
        {
          id: 3,
          text: "Event 3",
          start: "2022-03-08T12:00:00",
          end: "2022-03-08T15:00:00",
          backColor: "#f1c232"
        },
        {
          id: 4,
          text: "Event 4",
          start: "2022-03-06T11:30:00",
          end: "2022-03-06T14:30:00",
          backColor: "#cc4125"
        },
      ]
    });
  }


  render() {
    const {...config} = this.state;
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={2}
            skipMonths={2}
            onTimeRangeSelected={ args => {
              this.setState({
                startDate: args.day
              });
            }}
          />
        </div>
        <div style={styles.main}>
        <DayPilotCalendar
          {...config}
          ref={component => {
            this.calendar = component && component.control;
          }}
        />
        </div>
      </div>
    );
  }
}

export default Calendar;