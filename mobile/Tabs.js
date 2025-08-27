import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from './screens/HomeScreen';
import PostsScreen from './screens/PostsScreen';
import ProfileScreen from './screens/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchScreen from "./screens/searchScreen";
import ChatScreen from "./screens/chatScreen";


const Tab = createBottomTabNavigator();

export default function Tabs({ navigation }) {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopWidth: 1,
                    borderTopColor: "white",
                    height: 60,
                },
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Search':
                            iconName = focused ? "search" : "search-outline";
                            break;
                        case 'Post':
                            iconName = 'add-circle';
                            size = 30;
                            color = focused ? 'white' : 'gray';
                            break;
                        case 'Chats':
                            iconName = focused ? "chatbubble" : "chatbubble-outline"
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'ellipse-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" >
                {() => <HomeScreen navigation={navigation} />}
            </Tab.Screen>
            <Tab.Screen name="Search">
                {() => <SearchScreen  />}
            </Tab.Screen>
            <Tab.Screen name="Post" component={PostsScreen} />
            <Tab.Screen name="Chats" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}