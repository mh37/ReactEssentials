import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


function TrainingCalendar(){

  const locales = {
    'en-US': enUS,
  }

  const eventsList = [
    {
      start: moment().toDate(),
      end: moment()
        .add(1, "days")
        .toDate(),
      title: "Some title"
    }
  ];
  
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
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
  );
}

export default TrainingCalendar;  

