import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../views/Register";

const OnboardingStack = createNativeStackNavigator()

export default function () {
    return <OnboardingStack.Navigator
    initialRouteName="register"
    screenOptions={{headerShown: false}}>
        <OnboardingStack.Screen name="register" component={Register}/>

    </OnboardingStack.Navigator>
}