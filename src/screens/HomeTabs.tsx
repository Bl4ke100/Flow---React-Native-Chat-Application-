import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "./Chats";
import CallScreen from "./Calls";
import StatusScreen from "./Status";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";


const Tabs = createBottomTabNavigator();


export default function HomeTabs() {

    const { applied } = useTheme();
    const color = applied === 'dark' ? '#FFFFFF' : '#000000';

    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = 'chatbubble-ellipses';
                if (route.name === 'Chats') {
                    iconName = 'chatbubble-ellipses';
                } else if (route.name === 'Status') {
                    iconName = 'time';
                } else if (route.name === 'Calls') {
                    iconName = 'call';
                }
                return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            tabBarLabelStyle: {
                paddingBottom: 4,
                fontSize: 12,
                fontWeight: 'bold',
                color: color,
                height: 30,
            },
            tabBarActiveTintColor: color,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: applied === 'dark' ? '#000000' : '#FFFFFF',
                borderTopColor: applied === 'dark' ? '#000000' : '#FFFFFF',
                height: 60,
                paddingTop: 4,
            },
            headerShown: false,
        })}>
            <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
            <Tabs.Screen name="Status" component={StatusScreen} options={{ headerShown: false }} />
            <Tabs.Screen name="Calls" component={CallScreen} options={{ headerShown: false }} />
        </Tabs.Navigator>
    );
}