import React, { useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Alert, Image} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux'
// import {Register} from '../store/Actions/Auth';
// import {authState} from '../store/type';

const StudentForm = ({navigation}) => {

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  })

   const dispatch = useDispatch();
  const store = useSelector(state => state.Auth);
  const registerUser = () => {
    const {name, email, password} = state;

    if(email && password && name){

      dispatch(Register(email, password, name))

    }

    else{
      Alert.alert('Name, Email and Password Are Required')
    }

  }

  useEffect(()=>{
    if(store.register){
      dispatch({type: authState, payload: {register: false, }})
      navigation.navigate("Login")
      console.log('UseEffect')
    }
  }, [store.register])
  return (
   <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
     <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1,}}>
     <View style={{marginTop: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
     <Image
        source={require('../../assets/logo.png')}
        style={{ width: 200, height: 150 }}
      />
     </View>

     <View style={{flex: 1,}}>
     
      <Text style={styles.label}>Name:</Text>
      <Input
        placeholder='Enter Your Name'
        value={state.name}
        onChangeText={(val) => setState({ ...state, name: val })}
      />
      <Text style={styles.label}>Email:</Text>
      <Input
        placeholder='Enter Your Email'
        value={state.email}
        onChangeText={(val) => setState({ ...state, email: val })}
      />
      <Text style={styles.label}>Password:</Text>
      <Input
        placeholder='Enter Your Password'
        errorStyle={{ color: 'red' }}
        secureTextEntry={true}
        value={state.password}
        onChangeText={(val) => setState({ ...state, password: val })}
      />
      <View style={styles.container}>
        <Button
          title="Register"
          type="outline"
          buttonStyle={{
            backgroundColor: '#34495e'
          }}
          titleStyle={{
            color: 'white',
          }}
          onPress={registerUser}
          loading={store.loading}
          disabled={store.loading}
        />
      </View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, marginTop: 10}}>
        <Text>
          Already have an Accout?
        </Text>
        <TouchableOpacity onPress={()=> {
          navigation.navigate("Login")
        }}
        disabled={store.loading}
        >
        <Text>Login</Text>
        </TouchableOpacity>
      
      </View>
    </View>
     </ScrollView>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 14,
    paddingLeft: 15
  }
})

export default StudentForm;