import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/splash';
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import HomeScreen from './src/screens/Home';
import ProfileScreen from './src/screens/Profile';
import SettingsScreen from './src/screens/Settings';
import ContactScreen from './src/screens/Contact';
import { ThemeProvider } from './src/theme/ThemeProvider';
import AvatarScreen from './src/screens/Avatar';
import { UserRegistrationProvider } from './src/components/UserContext';
import HomeTabs from './src/screens/HomeTabs';
import SingleChatScreen from './src/screens/SingleChat';
import NewChatScreen from './src/screens/NewChat';
import { WebSocketProvider } from './src/socket/WebSocketProvider';
import { useContext } from 'react';
import { AuthContext } from './src/components/AuthProvider';
import NewContactScreen from './src/screens/NewContactScreen';

export type RootStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  Contact: undefined;
  Avatar: undefined;
  SignIn: undefined;
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  NewChat: undefined;
  NewContact: undefined;
  SingleChat: {
    chatId: number;
    friendName: string;
    lastSeenTime: string;
    profileImage: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

    const auth = useContext(AuthContext);


  return (
    <WebSocketProvider userId={auth ? Number(auth.userId) : 0}>

      <ThemeProvider>
        <UserRegistrationProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' screenOptions={{ animation: 'fade' }}>
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SingleChat" component={SingleChatScreen} options={{ headerShown: false }} />
              <Stack.Screen name="NewChat" component={NewChatScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Avatar" component={AvatarScreen} options={{ headerShown: false }} />
              <Stack.Screen name="NewContact" component={NewContactScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserRegistrationProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}
