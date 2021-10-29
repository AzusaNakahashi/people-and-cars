import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_CARS } from '../../queries'
import { List } from 'antd'
import Car from '../../listItems/Car'
import { Link } from 'react-router-dom'

const getStyles = () => ({
    list: {
      display: 'flex',
      justifyContent: 'center'
    }
  })

const Cars = (props) => {
    const styles = getStyles()
    const personData = props.location.person
    const personDataId = props.location.person.id

    const { loading, error, data } = useQuery(GET_CARS)
    /*const { loading, error, data } = useQuery(GET_CARS, {
        personId: "1"
    })*/
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <div>
            <h2>{personData.firstName}'s Car(s) List</h2>
            <p>{data.length}</p>
            <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.cars.filter( car => car.personId === personDataId)
            .map(({ id, year, make, model, price, personId }) => (
                    <List.Item key={id}>
                        <Car key={id} carId={id} year={year} make={make} model={model} price={price} personId={personId} personData={personData} />
                    </List.Item>
            ))}
            </List>
            <Link to="/">Go Back Home</Link>
        </div>
    )
}

export default Cars
