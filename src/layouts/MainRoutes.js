import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import signUpPage from "../auth/signUpPage";
import SignInPage from "../auth/SignInPage";
import DashboardPage from "../with-login/DashboardPage";

const Stack = createNativeStackNavigator();

const MainRoutes = () => {
  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="signIn" component={SignInPage} />
        <Stack.Screen name="signUp" component={signUpPage} />
        <Stack.Screen name="Dashboard" component={DashboardPage} />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default MainRoutes;
