import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView, Alert, ActivityIndicator, Image} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
 import {Login} from '../store/Actions/Auth';
 import {useDispatch, useSelector} from 'react-redux'
 import {authState} from '../store/type';

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   const state = useSelector(state => state.Auth);

  const LoginHandler = () => {
    console.log(email)
    if(email && password){

      dispatch(Login(email, password));
    }
    else{
      Alert.alert('Email and Password Are Required')
    }
  }


  useEffect(()=>{
    if(state.login){
      dispatch({type: authState, payload: {loading: false, }})
      navigation.navigate('Home');
    }
  }, [state.login])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
       <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, }} >
      <View style={{ flex: 1, }}>
     <View style={{marginTop: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
     <Image
        source={require('../../assets/logo.png')}
        style={{ width: 200, height: 150 }}
        placeholder={ActivityIndicator}
      />
     </View>
        <Text style={styles.label}>Email:</Text>
        <Input
          placeholder='Enter Your Email'
          onChangeText={(val)=> setEmail(val)}
          value={email}
        />
        <Text style={styles.label}>Password:</Text>

        <Input
          placeholder='Enter Your Password'
          errorStyle={{ color: 'red' }}
          secureTextEntry={true}
          value={password}
          onChangeText={(val)=> setPassword(val)}
          
        />
        <View style={styles.container}>
          <Button
            title="Login"
            type="outline"
            buttonStyle={{
              backgroundColor: '#34495e'
            }}
            titleStyle={{
              color: 'white',
            }}
            onPress={LoginHandler}
          // loading={state.loading}
          // disabled={state.loading}
          />
        </View>
        <View style={styles.accountSetting}>
          <Text>
            Don't have an Accout?
        </Text>
          <TouchableOpacity onPress={() => {
           navigation.navigate('Register')
          }}
          >
            <Text>Register</Text>
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
    backgroundColor: 'white'
  },
  label: {
    fontSize: 14,
    paddingLeft: 15
  },
  accountSetting: {
    justifyContent: 'space-between',
    flexDirection: 'row', paddingHorizontal: 10,
    marginTop: 5
  }
})

export default LoginScreen;