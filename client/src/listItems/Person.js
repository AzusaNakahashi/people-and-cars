import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import RemovePerson from '../components/buttons/RemovePerson'
import UpdatePerson from '../components/forms/UpdatePerson'
import {
  Link,
} from "react-router-dom";

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Person = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }


  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <div>
          <Card
            style={styles.card}
            actions={[
              <Link to={{
                pathname:'/carsList',
                person: props
                }} >
                  Learn More
              </Link>,
              <EditOutlined key='edit' onClick={handleButtonClick} />,
              <RemovePerson id={id} firstName={firstName} lastName={lastName} />,
            ]}
          >
            {firstName} {lastName}
          </Card>
        </div>
      )}
    </div>
  )
}

export default Person
