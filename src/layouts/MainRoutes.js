import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import signUpPage from "../auth/signUpPage";
import SignInPage from "../auth/SignInPage";
import DashboardPage from "../with-login/DashboardPage";

import { connect, useDispatch } from "react-redux";
import { SetToken, decrement, increment } from "../actions/action";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../services/Storage.service";

const Stack = createNativeStackNavigator();

const MainRoutes = ({ token }) => {
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      new Promise(async (res, rej) => {
        const _token = await getData("token");
        if (_token) {
          dispatch(SetToken(_token || null));
        }
        res(1);
      });
    })
  );

  console.log("token: ", token);
  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardPage} />
        <Stack.Screen name="signUp" component={signUpPage} />
        <Stack.Screen name="signIn" component={SignInPage} />
      </Stack.Navigator>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log("state: ", state);
  return {
    ...state?.AuthReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainRoutes);
