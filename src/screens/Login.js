// import React, {useEffect } from "react";
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { Text, Button } from "react-native-elements";
// import { useDispatch, useSelector } from "react-redux";
// import { authState } from "../store/type";
import { useForm, Controller } from "react-hook-form";
import AuthService from "../services/Auth";
const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  // const dispatch = useDispatch();
  // const state = useSelector((state) => state.Auth);

  // useEffect(() => {
  //   if (state.login) {
  //     dispatch({ type: authState, payload: { loading: false } });
  //     navigation.navigate("Home");
  //   }
  // }, [state.login]);

  const LoginHandler = async () => {
    try {
      const {user} = await AuthService.signUp("test4@gmail.com", "123456");
      console.log("res----> ", user);
    } catch (error) {
      console.log("error----> ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginTop: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 200, height: 150 }}
              placeholder={ActivityIndicator}
            />
          </View>

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </>
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.email && <Text>This is required.</Text>}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </>
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.password && <Text>This is required.</Text>}
          <View style={styles.container}>
            <Button
              title="Login"
              type="outline"
              buttonStyle={{
                backgroundColor: "#34495e",
              }}
              titleStyle={{
                color: "white",
              }}
              onPress={LoginHandler}
              // loading={state.loading}
              // disabled={state.loading}
            />
          </View>
          <View style={styles.accountSetting}>
            <Text>Don't have an Accout?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
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
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    paddingLeft: 15,
  },
  accountSetting: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

export default LoginScreen;
