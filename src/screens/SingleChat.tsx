import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { Entypo, Ionicons } from "@expo/vector-icons";

type SingleChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SingleChat"
>;

type Message = {
    id: string;
    text: string;
    sender: "me" | "friend";
    status: "sent" | "delivered" | "read";
    time: string;
}

const dummyMessages: Message[] = [];
export default function SingleChatScreen() {

    const { applied } = useTheme();

    const navigation = useNavigation<SingleChatProps>();

    const [message, setMessage] = useState<Message[]>([

        { id: '1', text: 'Hello!', sender: 'friend', status: 'read', time: '10:00 AM' },
        { id: '2', text: 'Hi! How are you?', sender: 'me', status: 'read', time: '10:01 AM' },
        { id: '3', text: 'I am good, thanks! What about you?', sender: 'friend', status: 'delivered', time: '10:02 AM' },
        { id: '4', text: 'Doing well, just working on a project.', sender: 'me', status: 'sent', time: '10:03 AM' },
        { id: '5', text: 'That\'s great to hear!', sender: 'friend', status: 'read', time: '10:04 AM' },
        { id: '6', text: 'Yes, indeed. Let\'s catch up later.', sender: 'me', status: 'sent', time: '10:05 AM' },
        { id: '7', text: 'Sure, talk to you soon!', sender: 'friend', status: 'read', time: '10:06 AM' },
    ]);

    const [inputText, setInputText] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: '',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: applied === 'dark' ? '#242424' : '#DBDBDB',
            },
            headerTitleStyle: {
                color: applied === 'dark' ? '#FFFFFF' : '#000000',
                fontSize: 25,
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <View className="flex-row items-center mt-4">
                    <Image source={require('../../assets/avatars/avatar_1.png')} className="w-14 h-14 mr-2 mb-4" />
                    <View className="mb-4">
                        <Text className="text-lg font-bold text-black dark:text-white">John Doe</Text>
                        <Text className="text-sm text-gray-500 dark:text-gray-400">Online</Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity className="mr-4 mb-4 mt-4">
                    <Ionicons name="ellipsis-vertical" size={24} color={applied === 'dark' ? '#FFFFFF' : '#000000'} />
                </TouchableOpacity>
            )

        });
    }, [navigation]);

    const renderItem = ({ item }: { item: Message }) => {
        const isMe = item.sender === 'me';
        return (
            <View className={`my-2 px-3 rounded-2xl max-w[75%] ${isMe ?
                `self-end bg-red-500` : `self-start bg-red-300`
                }`}
            >
                <Text className={`${isMe ? `text-white` : `text-white`}`} >{item.text}</Text>
                <View>
                    <Text className={`text-xs ${isMe ? `text-white` : `text-white`} self-end`}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-black">
            <KeyboardAvoidingView behavior="padding" className="flex-1 w-full" keyboardVerticalOffset={120}>
                <FlatList
                    data={message}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    className="flex-1 px-4"
                    inverted={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', paddingBottom: 10 }}
                />
                <View className="flex-row items-center border-t border-gray-300 px-4 py-2 bg-white dark:bg-black">
                    <TextInput
                        className="flex-1 h-12 px-4 mr-2 py-2 border border-gray-300 rounded-full text-black dark:text-white bg-white dark:bg-black"
                        placeholder="Type a message..."
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                        multiline
                        placeholderTextColor={applied === 'dark' ? '#AAAAAA' : '#555555'}
                    />
                    <TouchableOpacity className="p-2 bg-black dark:bg-white rounded-full">
                        <Ionicons name="send" size={24} color={applied === 'dark' ? 'black' : 'white'} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}