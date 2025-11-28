import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/screens/login";
import Cadastro from "./src/screens/cadastro";
import Home from "./src/screens/home";
import Perfil from "./src/screens/perfil";
import MeusLivros from "./src/screens/lista";
import AddLivro from "./src/screens/addLivro";
import ForgotPassword from "./src/screens/forgotPassword";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="MeusLivros" component={MeusLivros} />
        <Stack.Screen name="AddLivro" component={AddLivro} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
