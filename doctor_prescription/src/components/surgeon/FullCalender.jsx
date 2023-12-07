import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function FullCalender(props) {
  console.log(props.surgicalProceduresList)
  
    const events = props.surgicalProceduresList.map((event) => ({
      title: `${event.Patients?.name || ""} - ${event.SurgicalProceduresType?.name || ""} `, // Use optional chaining
      start: event.SurgeryDate, // The start date and time of the event
      groupId:event._id
    }));
    const handleEventClick = (clickInfo) => {
      // Handle the event click here
      console.log("Event clicked:", clickInfo);
      props.onEditHandle(clickInfo.event._def.groupId)
      // You can access more information about the clicked event using clickInfo.event
    };
  
  return (
    <div className=" overflow-auto h-full p-4   AZSX ">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        events={events} // Pass the events array to the events prop
        eventClick={handleEventClick} // Attach the event click callback

      />
    </div>
  );
}

export default FullCalender;
