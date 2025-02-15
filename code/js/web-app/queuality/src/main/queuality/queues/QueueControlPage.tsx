import React, { useEffect, useState } from 'react'
import { Breadcrumb, Header, Icon} from 'semantic-ui-react'
import { QueuesTable } from './QueuesTable'
import { NoQueuesDisplay } from './NoQueuesDisplay'
import { Queue } from './queueModel'
import { Link } from 'react-router-dom'

export namespace QueuesControl {

    interface QueueProps {
        queuesArray?: Array<Queue>
        err: String
        handleSetNewQueue?: (newQueue: Queue) => void
        handleDeleteQueue?: (queue: Queue) => void
        handleEditQueue?: (queue: Queue) => void
    }

    /**
     * @param props {QueueProps} props - The props object.
     * @returns The React Element used to render the page's body.
     */

    function QueuePageBody(props: QueueProps) {
        return (                           
            (props.queuesArray && props.queuesArray!!.length ? 
                <>
                    <QueuesTable 
                        queuesArray={props.queuesArray} 
                        err = {props.err}
                        handleSetNewQueue={props.handleSetNewQueue} 
                        handleDeleteQueue = {props.handleDeleteQueue}
                        handleEditQueue = {props.handleEditQueue}
                    />
                </> :  
                    <NoQueuesDisplay 
                        handleSetNewQueue = {props.handleSetNewQueue}
                        err = {props.err}   
                    />   

            )
        )
    }

    function PageHeader() {
        return (
            <>
                <div className='Control-header'>
                    <Breadcrumb>
                        <Breadcrumb.Divider icon='right chevron' />
                        <Breadcrumb.Section link as={Link} to={'/queuality/'}>Home</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron' />            
                        <Breadcrumb.Section link as={Link} to={'/queuality/tickets'}>Tickets</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right arrow' />
                        <Breadcrumb.Section active>Queues</Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <Header as='h2' icon textAlign='center' style={{color: '#85C1E9'}}>
                    <Icon name='users' circular />
                    <Header.Content>Queues</Header.Content>
                </Header>
            </>
        )
    }

    export function Page() {
        
        const [queues, setQueues] = useState<Queue[]>()
        const [err, setError] = useState<string>('')

    useEffect(() => {
            async function loadQueues() {
                console.log("Loading queues ...")
                await fetch('http://localhost:5000/api/queues')
                    .then(queues => queues.json())
                    .then(res => setQueues(res.properties))
            }
            console.log("Running queues state effect ...")
            if (!queues) loadQueues()
        }, [queues])

        async function handleSetNewQueue(newQueue: Queue): Promise<void> {
            if (queues) {
                const qs = queues
                setQueues(undefined)
                const data = {'name' : newQueue.name,  'subject' : newQueue.subject, 'priority' : newQueue.priority}
                await fetch('http://localhost:5000/api/queues', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(res => {
                        if(res.error)
                            setError(res.error.message)
                        return res
                    })
                qs.push(newQueue)
                setQueues(qs)
            }
        }
        
        async function handleDeleteQueue(queue: Queue) : Promise<void> {
            if(queues) {
                const qs = queues
                setQueues(undefined)
                await fetch(`http://localhost:5000/api/queues/${queue._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                qs.slice(qs.indexOf(queue))
                setQueues(qs)
            }
        }

        async function handleEditQueue(queue: Queue): Promise<void> {
            if(queues) {
                const qs = queues
                setQueues(undefined)
                const data = {'subject' : queue.subject, 'priority' : queue.priority}
                await fetch(`http://localhost:5000/api/queues/${queue._id}`, 
                {
                    method : 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                    
                })
                qs[qs.findIndex(item => item._id === queue._id)] = queue
                setQueues(qs)
            }
        }

        return (
            <>
                <PageHeader />
                <QueuePageBody
                    queuesArray = {queues} 
                    err = {err}
                    handleSetNewQueue = {handleSetNewQueue}
                    handleDeleteQueue = {handleDeleteQueue}
                    handleEditQueue = {handleEditQueue}
                />
            </>
        )
    }
}