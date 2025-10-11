import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home";
import SettingsScreen from "./Settings";
import NewChatScreen from "./NewChat";

const Stack = createNativeStackNavigator();
export default function ChatsScreen() {
    return (
       <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewChat" component={NewChatScreen} options={{ headerShown: false }} />
       </Stack.Navigator>
    );
}
