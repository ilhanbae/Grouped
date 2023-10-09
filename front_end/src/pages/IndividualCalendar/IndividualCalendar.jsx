import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './IndividualCalendar.css';
import 'moment-timezone';

moment.tz.setDefault('America/New_York');
const localizer = momentLocalizer(moment);

const IndividualCalendar = (props) => {
//     const state = {
//         events: [
//           {
//             start: moment().toDate(),
//             end: moment()
//               .add(1, "hours")
//               .toDate(),
//             title: "Some title"
//           }
//         ]
//     };

    return (
        <div classname="calendarApp" style={{backgroundColor:"lightgray"}}>
            <br/>
            <div>
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="week"
//                     events={state.events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: "70vh", padding:"10px 10px 10px 10px"}}
                />
            </div>
        </div>
    );
};

export default IndividualCalendar;