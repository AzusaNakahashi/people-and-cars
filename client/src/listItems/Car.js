import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdateCar from '../components/forms/UpdateCar'
import RemoveCars from '../components/buttons/RemoveCars'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Car = props => {
  const [ id, setId ] = useState(props.carId)
  const [ year, setYear ] = useState(props.year)
  const [ make, setMake ] = useState(props.make)
  const [ model, setModel ] = useState(props.model)
  const [ price, setPrice ] = useState(props.price)
  const [ personId, setPersonId ] = useState(props.personId)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'id':
        setId(value)
        break
      case 'year':
        setYear(value)
        break
      case 'make':
        setMake(value)
        break
      case 'model':
        setModel(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
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
        <UpdateCar
          id={props.carId}
          year={props.year}
          make={props.make}
          model={props.model}
          price={props.price}
          personId={props.personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <div>
          <Card
            style={styles.card}
            actions={[
              <EditOutlined key='edit' onClick={handleButtonClick} />,
              <RemoveCars
                id={id}
                year={year}
                make={make}
                model={model}
                price={price}
                personId={personId}
                onButtonClick={handleButtonClick}
                updateStateVariable={updateStateVariable} 
              />,
            ]}
          >
            <p>Year:{year}</p> 
            <p>Manufacturer:{make}</p> 
            <p>Model:{model}</p> 
            <p>Price:{price}</p>
            <p>Owner:{personId}</p>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Car
