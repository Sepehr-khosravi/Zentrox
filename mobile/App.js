import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import Navbar from './components/main/Home/navbar';
import Tabs from './Tabs';
import { api } from './config/config';
import Auth from './screens/Auth';
import UserProfile from './screens/userProfile';
import Setting from './screens/setting';
import Dm from './components/Chat/Dm';
import NotificationScreen from './screens/NotificationScreen';
import FriendRequestsList from './components/Chat/friendRequestsList';

const Stack = createStackNavigator();

export default function App() {
  const [userToken, setToken] = useState(null);
  const [isLogin, setLogin] = useState(null);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const response = await axios.post(api.verifyToken, { token: token });
        if (!response.data.error) {
          setToken(token);
          setLogin(true);
        } else {
          setToken("");
          setLogin(false);
        }
      } else {
        setToken("");
        setLogin(false);
      }
    } catch (e) {
      console.log('error in checking token : ', e);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isLogin === null) return null;

  return (
    <>
      {
        isLogin ? (
          <>
            <NavigationContainer theme={DarkTheme}>
              <StatusBar barStyle="light-content"  />
              <Stack.Navigator screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#000' },
                animation: 'fade'
              }}>
                <Stack.Screen name="Main" component={Tabs} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="Dm" component={Dm} />
                <Stack.Screen name="Notification" component={NotificationScreen} />
                <Stack.Screen name="FriendRequests" component={FriendRequestsList} />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        ) : (
          <Auth checkToken={checkToken} />
        )
      }
    </>
  );
}

