import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { User } from "../socket/chat";
import { useUserList } from "../socket/UseUserList";

type NewChatScreenProps = NativeStackNavigationProp<RootStack, 'NewChat'>;


export default function NewChatScreen() {
  const navigation = useNavigation<NewChatScreenProps>();

   const [search, setSearch] = useState<string>("");
  const users = useUserList();

  const { applied } = useTheme();
  const logo =
    applied === 'dark'
      ? require("../../assets/logo/Flow_Logo_White.png")
      : require("../../assets/logo/Flow_Logo_Black.png");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitleAlign: 'left',
      headerStyle: {
        backgroundColor: applied === 'dark' ? '#0D0D0D' : '#DBDBDB',
      },
      headerTitleStyle: {
        color: applied === 'dark' ? '#0D0D0D' : '#DBDBDB',
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <View className="flex-row items-center mt-3 pb-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={applied === 'dark' ? 'white' : 'black'} />
          </TouchableOpacity>
          <View className="ml-2">
            <Text className={`text-xl font-bold ${applied === 'dark' ? 'text-white' : 'text-black'}`}>Select Contact</Text>
            <Text className={`text-sm ${applied === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{users.length} contacts</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center gap-4 mr-4">
          <TouchableOpacity onPress={() => navigation.navigate("NewContact")}>
            <Feather name="user-plus" size={24} color={applied === 'dark' ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>
      )
    });

  }, [navigation]);

 

  const renderItem = ({ item }: { item: User }) => (
    <View>
      <TouchableOpacity className="flex-row items-center justify-between w-full px-4 py-4 border-b border-gray-200 dark:border-gray-800 active:bg-gray-100 dark:active:bg-gray-900"
        onPress={()=>{
          navigation.navigate("SingleChat", {
            chatId:item.id,
            friendName:`${item.firstName} ${item.lastName}`, 
            lastSeenTime:item.updatedAt,
            profileImage:item.profileImage ? item.profileImage : "",

          })
        }}
      >
        <View className="flex-row items-center flex-1">
          <TouchableOpacity>
            {item.profileImage ? (
              <Image source={{ uri: item.profileImage }} className="w-14 h-14 rounded-full mr-3" />
            ) : (
              <View className="w-14 h-14 rounded-full mr-3 bg-gray-200 dark:bg-gray-800 justify-center items-center">
                <Text className="text-3xl text-gray-500 dark:text-gray-400 text-center font-bold">
                  {item.firstName.charAt(0).toUpperCase()}{item.lastName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <View className="flex-1 mr-2">
            <Text className="text-base font-semibold text-black dark:text-white mb-1" numberOfLines={1} ellipsizeMode="tail">
              {item.firstName} {item.lastName}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400" numberOfLines={1} ellipsizeMode="tail">
              {item.countryCode} {item.contactNo}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color={applied === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

   const filteredUsers = [...users].filter((user) => {
        console.log(user);

        return(
            user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(search.toLowerCase())||
            user.contactNo.includes(search)
        )
    }).sort((a,b) => a.firstName.localeCompare(b.firstName));

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-black">
      <StatusBar hidden={true} />
      <View className="flex-row items-center border-gray-300 rounded-xl border w-11/12 h-12 px-4 bottom-4">
        <Ionicons name="search" size={24} color={applied === 'dark' ? '#FFFFFF' : '#000000'} />
        <TextInput className="flex-1 mx-1 p-2 border-0 text-black dark:text-white text-lg font-bold placeholder:text-gray-500" placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}