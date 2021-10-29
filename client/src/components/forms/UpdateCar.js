import React, { useEffect, useState } from 'react'

import { Form, Input, Button, InputNumber } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_CAR } from '../../queries'

const UpdateCar = props => {
  const [ id, setId ] = useState(props.id)
  const [ year, setYear ] = useState(props.year)
  const [ make, setMake ] = useState(props.make)
  const [ model, setModel ] = useState(props.model)
  const [ price, setPrice ] = useState(props.price)
  const [ personId, setPersonId ] = useState(props.personId)
  const [updateCar] = useMutation(UPDATE_CAR)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate()
  }, [])

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
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
      case 'Price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
        break
      default:
        break
    }
  }

  const onFinish = values => {
    const { year, make, model, price, personId  } = values

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateCar: {
          __typename: 'Car',
          id,
          year,
          make,
          model,
          price,
          personId

        }
      }
    })
    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-contact-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        price: price,
        model: model,
        personId: personId
      }}
      size='large'
    >
      <Form.Item
        name='year' label="Year"
        rules={[{ required: true, message: 'Please input a year!' }]}
      >
        <InputNumber onChange={value => updateStateVariable('year', value)} />
      </Form.Item>
      <Form.Item name='make' label="Manufacturer" rules={[{ required: true, message: 'Please input a car manufacturer!' }]}>
        <Input onChange={e => updateStateVariable('make', e.target.value)} />
      </Form.Item>
      <Form.Item name='price' label="Price" rules={[{ required: true, message: 'Please input a price!' }]}>
        <InputNumber onChange={value => updateStateVariable('price', value)} />
      </Form.Item>
      <Form.Item name='model' label="Model" rules={[{ required: true, message: 'Please input a model!' }]}>
        <Input onChange={e => updateStateVariable('model', e.target.value)} />
      </Form.Item>
      <Form.Item name='personId'  label="Owner" rules={[{ required: true, message: 'Please input an owner!' }]}>
        <Input onChange={e => updateStateVariable('personId', e.target.value)} />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('price') && !form.isFieldTouched('model') && !form.isFieldTouched('personId')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
