import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Screens from "../screens";

const Public = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="StudentForm" component={Screens.StudentForm} />
      <Stack.Screen name="Register" component={Screens.SignUp} />
      <Stack.Screen name="Login" component={Screens.Login} />
      <Stack.Screen name="CompanyForm" component={Screens.CompanyForm} />
    </Stack.Navigator>
  );
};

export default Public;
