import React from 'react'
import { useQuery } from '@apollo/client'
import { List } from 'antd'
import Person from '../../listItems/Person'
import { GET_CARS, GET_PEOPLE } from '../../queries'
import Car from '../../listItems/Car'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const People = () => {
  const styles = getStyles()
  const { loading: loadingC, error: errorC, data: dataC } = useQuery(GET_CARS)
  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading || loadingC) return 'Loading...'
  if (error) return `Error! ${error.message}`
  if (errorC) return `Error! ${errorC.message}`

  return (
    <>
    <h2>People List</h2>
    {<List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Person key={id} id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
      </List>}
    <h2>Cars List</h2>
    {<List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {dataC.cars.map(({ id, make, model, personId, price,  year,}) => (
        <List.Item key={id}>
          <Car key={id} carId={id} year={year} make={make} model={model} price={price} personId={personId} />
        </List.Item>
      ))}
      </List>}
    </>
  )
}

export default People
