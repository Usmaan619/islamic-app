import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { Formik } from "formik";
import { ICONS, LOGIN_CREDENTIALS } from "../constants/Contant";
import B from "../components/B.component";
import { authStyles } from "../styles/authStyle";
import { GradientHOC } from "../HOC/Gradient.hoc";
import { loginSvc, loginValidationSchema } from "../utils/helper";
import CommonButton from "../components/CommonButton";
import { checkToken, loginAPI } from "../services/Auth.service";
import { useDispatch } from "react-redux";

const SignIn = ({ navigation }) => {
  const [isShowPassword, setIsShowPassword] = useState(true);

  const dispatch = useDispatch();

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // useEffect(() => {
  //   new Promise(async (resolve, reject) => {
  //     const res = await loginAPI();
  //     console.log("res: ", res);
  //   });
  // }, []);

  const onSubmit = async (value) => {
    // const users = loginSvc(LOGIN_CREDENTIALS, value);
    // console.log("users: ", users);
    try {
      const res = await loginAPI({
        email: value?.email,
        password: value?.password,
      });
      console.log("res: ", res);
    } catch (error) {
      console.log("error: ", error);
    }

    // await checkToken(dispatch, users?.data?.token);

    // if (value) {
    //   if (!users) {
    //     alert("User Not found");
    //     return;
    //   }
    //   if (users) navigation.navigate("Dashboard");

    //   setTimeout(() => {
    //     // unMount();
    //   }, 1000);
    // }
  };

  return (
    <ScrollView>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
      >
        {(formikProps) => {
          const {
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          } = formikProps;
          formikFn = formikProps;
          return (
            <View style={styles.signUpcontainer}>
              <View className="flex justify-center mt-2">
                <View className="flex-row justify-center items-center">
                  <Image
                    source={ICONS?.intelligenceMainWhiteImg}
                    resizeMode="cover"
                    className="h-[90px] w-[170px] overflow-hidden"
                  />
                </View>
                <Text className="text-center my-5 text-lg font-semibold text-white">
                  Welcome Back, Please Sign In To your Account.{" "}
                </Text>
                <View style={styles.signUpInputMainContainer}>
                  <SafeAreaView style={styles.signUpInputSubContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <BlurView intensity={100} style={styles.input}>
                      <TextInput
                        placeholder="you@example.com"
                        style={{ padding: 10 }}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                    </BlurView>

                    {errors.email && touched.email && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.email}
                      </Text>
                    )}

                    <Text style={styles.signUpinputLabel2}>Password</Text>
                    <BlurView intensity={100} style={styles.input}>
                      <TextInput
                        style={{ padding: 10 }}
                        secureTextEntry={isShowPassword}
                        placeholder="******"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                      <TouchableOpacity onPress={togglePassword}>
                        <Image
                          style={styles.passwordEye}
                          source={
                            isShowPassword ? ICONS.crossEyeImg : ICONS.eyeImg
                          }
                          fadeDuration={0}
                        />
                      </TouchableOpacity>
                    </BlurView>
                    {errors.password && touched.password && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.password}
                      </Text>
                    )}
                  </SafeAreaView>
                </View>

                <View style={{ marginTop: "10%" }}>
                  <CommonButton
                    onPress={() => {
                      handleSubmit();
                    }}
                    title={"sign In"}
                  />
                </View>
                <Text
                  style={styles.dontHaveAccount}
                  onPress={() => {
                    navigation.navigate("signUp");
                  }}
                >
                  don't have account? <B>Sign up</B>
                </Text>
              </View>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create(authStyles);

export default GradientHOC(SignIn);
