import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [message, setMessage] = useState('')
  const [isError, setIserror] = useState(false)
  const [idSearch, setIdsearch] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors }, reset, setValue } = useForm({
      defaultValues: {
        firstName: '',
        lastName: ''
      }
    });
  const onSave = async (data) => {
    console.log(data);
    let nombre = data.firstName
    let apellidos = data.lastName
    const response = await axios.post('http://127.0.0.1:3000/api/clientes', {
      nombre,
      apellidos,
    })
    setIserror(false)
    setMessage('Cliente agregado correctamente');
    setTimeout(() => {
      setMessage('')
    }, 2000)
    reset()
  }

  const onUpdate = async (data) => {
    console.log(data);
    let nombre = data.firstName
    let apellidos = data.lastName
    const response = await axios.put('http://127.0.0.1:3000/api/clientes/' + idSearch, {
      nombre,
      apellidos,
    })
    setIserror(false)
    setMessage('Cliente editado correctamente');
    setTimeout(() => {
      setMessage('');
      reset()
    }, 2000)
    setIdsearch('')
  }

  const onSearch = async () => {
    const response = await axios.get('http://127.0.0.1:3000/api/clientes/' + idSearch)
    console.log(response.data)
    if (!response.data.error) {//Lo encuentra
      setValue('firstName', response.data.nombre)
      setValue('lastName', response.data.apellidos)
      setIserror(false)
      setMessage('')
    } else {
      setIserror(true)
      setMessage('Cliente no encontrado')
      setTimeout(() => {
        setMessage('')
        setIdsearch('')
      }, 2000)
      reset()
    }
  }

  const onDelete = async (data) => {
    if (confirm(`Está seguro de eliminar a ${data.firstName} ${data.lastName}`)) {
      const response = await axios.delete(`http://127.0.0.1:3000/api/clientes/${idSearch}`)
      setIserror(false)
      setMessage("Cliente eliminado correctamente")
      setTimeout(() => {
        setMessage('');
        reset();
      }, 2000)
    }
  }

  return (
    <View style={styles.container}>
      <Text style></Text>
      <TextInput
        label={'Id del cliente'}
        mode='outlined'
        onChangeText={idSearch => setIdsearch(idSearch)}
        value={idSearch}
      ></TextInput>

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 15
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={'Nombre Completo'}
            mode='outlined'
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 20 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName?.type == "required" && (<Text style={{ color: 'red' }} >El nombre es obligatorio.</Text>)}
      {errors.firstName?.type == "maxLength" && (<Text style={{ color: 'red' }} >El nombre es de 15 caracteres.</Text>)}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 15
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={'Apellidos Completos'}
            mode='outlined'
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 20 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName?.type == "required" && (<Text style={{ color: 'red' }} >El apellido es obligatorio.</Text>)}
      {errors.lastName?.type == "maxLength" && (<Text style={{ color: 'red' }} >El apellido es de 15 caracteres.</Text>)}

      <Text style={{ color: isError ? 'red' : 'green' }}>{message}</Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Button icon="plus-box"
          mode="contained"
          onPress={handleSubmit(onSave)}
          style={{ backgroundColor: 'green', marginRight: '10px' }}
        >
          Guardar
        </Button>
        <Button icon="card-search-outline" mode="contained" onPress={onSearch}
          style={{ backgroundColor: 'blue' }}
        >
          Buscar
        </Button>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Button icon="plus-box" mode="contained" onPress={ handleSubmit(onUpdate)}
          style={{ backgroundColor: 'orange', marginRight: '10px' }}
        >
          Editar
        </Button>
        <Button icon="card-search-outline" mode="contained" onPress={handleSubmit(onDelete)}
          style={{ backgroundColor: 'red' }}
        >
          Eliminar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
