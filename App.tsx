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

export type RootStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  Contact: undefined;
  SignIn: undefined;
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Contact' screenOptions={{ animation: 'slide_from_right' }}>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
