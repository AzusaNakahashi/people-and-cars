import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { Form, Input, Button, InputNumber } from 'antd'

import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS } from '../../queries'

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [addCar] = useMutation(ADD_CAR)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values

    addCar({
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
        addCar: {
          __typename: 'Car',
          id,
          year, 
          make, 
          model, 
          price, 
          personId 
        }
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS })
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar]
          }
        })
      }
    })
  }

  return (
    <div>
      <h2>Car Form</h2>
      <Form
        form={form}
        name='add-contact-form'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px' }}
      >
        <Form.Item
          name='year' label="Year"
          rules={[{ required: true, message: 'Please input the year! ' }]}
        >
          <InputNumber placeholder='i.e. 2021' />
        </Form.Item>
        <Form.Item
          name='make' label="Manufacturer"
          rules={[{ required: true, message: 'Please input the manufacturer ' }]}
        >
          <Input placeholder='i.e. Honda' />
        </Form.Item>
        <Form.Item
          name='model' label="Model"
          rules={[{ required: true, message: 'Please input the model ' }]}
        >
          <Input placeholder='i.e. Civic' />
        </Form.Item>
        <Form.Item
          name='price' label="Price"
          rules={[{ required: true, message: 'Please input the price! ' }]}
        >
          <InputNumber placeholder='i.e. 30000' />
        </Form.Item>
        <Form.Item
          name='personId' label="Owner"
          rules={[{ required: true, message: 'Please input the owner! ' }]}
        >
          <Input placeholder='i.e. 3' />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddCar
