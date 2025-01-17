import { useState, useEffect } from 'react'
import EventForm, { NewEventData } from './EventForm'
import { Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { selectEventData, EventPageData, fetchTicketingData } from '../../../ticketing/ticketingSlice'
import { appSelector, useAppDispatch } from '../../../../app/hooks'
import { diff } from 'deep-diff'
import { fetchEventInstanceData } from '../../../events/eventsSlice'
import { openSnackbar } from '../../../snackbarSlice'


interface EditEventPageProps { eventid: string }

const formatToEventFormData = (data: EventPageData): Partial<NewEventData> => ({
    eventname: data.title,
    eventdescription: data.description,
    image_url: data.image_url,
    showings: data.tickets.map(t => ({
        id: t.event_instance_id,
        DateTime: t.date,
        totalseats: t.totalseats ?? 0,
        ticketTypeId: '0'
    }))
})

export default function EditEventPage() {
    const dispatch = useAppDispatch()
    const { eventid } = useParams<EditEventPageProps>()
    const [ticketTypes, setTicketTypes] = useState([])

    const playData = appSelector(state => selectEventData(state, eventid))
    const initValues = playData ? formatToEventFormData(playData) : undefined

    const fetchTicketTypes = async () => {
        const res = await fetch('/api/tickets/type')
        setTicketTypes(await res.json())
    }
    useEffect(() => {
        fetchTicketTypes()
    }, [])

    const onSubmit = async (updatedData: NewEventData) => {
        const deltas = diff(initValues, updatedData)
        
        const res = await fetch('/api/edit-event', {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventid, deltas })
        })
        if (res.ok) {
            const results = await res.json()
            console.log(results)
            dispatch(fetchTicketingData())
            dispatch(fetchEventInstanceData())
            dispatch(openSnackbar(`Saved edit to ${playData?.title ?? 'event'}`))
        }
        else {
            dispatch(openSnackbar('Save failed'))
        }
    }

    return (
        <div>
            <Typography component='h1' variant='h3'>
                Edit {playData?.title ?? 'Your Event'}
            </Typography>
            <EventForm
                ticketTypes={ticketTypes}
                onSubmit={onSubmit}
                initialValues={initValues}
                editMode
            />
        </div>
    )
}


