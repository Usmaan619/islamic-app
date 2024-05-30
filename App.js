import { NavigationContainer } from "@react-navigation/native";
import MainRoutes from "./src/layouts/MainRoutes";
import store from "./src/store/store";
import { Provider } from "react-redux";
export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer independent={true}>
          <MainRoutes />
        </NavigationContainer>
      </Provider>
    </>
  );
}
