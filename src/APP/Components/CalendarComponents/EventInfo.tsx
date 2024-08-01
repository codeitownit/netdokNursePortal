import { IEventInfo } from "../../Modules/Dashboard/Pages/CalendarTodo/ListCalendar"
import { Typography } from "@mui/material"
import React from "react"

interface IProps {
  event: IEventInfo
}

const EventInfo = ({ event }: IProps) => {
  return (
    <>
      <Typography>{event.description}</Typography>
    </>
  )
}

export default EventInfo