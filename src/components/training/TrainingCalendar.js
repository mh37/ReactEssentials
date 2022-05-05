import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enGB from 'date-fns/locale/en-GB'
import React, {useState, useEffect} from 'react';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


function TrainingCalendar(){

  useEffect(() => {
    fetchTrainings()
  });

  const locales = {
    'en-GB': enGB,
  }

  const [trainings, setTrainings] = useState([]);

  //Simplified fetch of trainings with custom info 
  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.log(err))
  } 

  const eventList = trainings.map((training)=>{
    const endDate = moment(training.date).add(training.duration, 'minutes');
    return {
      title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
      start: new Date(training.date),
      end: new Date(endDate) 
    }
  })

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  return (
    <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
  );
}

export default TrainingCalendar;  
