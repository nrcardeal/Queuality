import { useState } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

type DeleteModalProps = {
    subjectName: string
    handleDeleteSubject(subjectId: string): void
}

export default function DeleteModal(props: DeleteModalProps) {
    const [open, setOpen] = useState<boolean>(false)

    return(
        <Modal
            size='tiny'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Icon name='trash alternate outline' link/>}
        >
            <Modal.Header>Delete Subject</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete subject {props.subjectName!!}?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {
                    setOpen(false)
                }}>
                No
                </Button>
                <Button positive onClick={() => {
                    setOpen(false)
                    props.handleDeleteSubject(props.subjectName)
                }}>
                Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}