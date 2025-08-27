import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar, Alert, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../config/config";
import axios from 'axios';


const NotificationItem = ({ item, navigation  }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("UserProfile", { email: item.from })} style={styles.card}>
      <Image source={item.avatar ? { uri: item.avatar } : { uri: "https://dfge.de/wp-content/uploads/blank-profile-picture-973460_640.png" }} style={styles.avatar} />

      <View style={styles.content}>
        <View style={styles.textRow}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.email}>{item.from}</Text>
          <Text style={styles.message}> {item.message}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons
            name={item.type === 'like' ? 'heart-outline' : 'chatbubble-ellipses-outline'}
            size={14}
            color="#888"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      <Image source={{ uri: item.postImage }} style={styles.postImage} />
    </TouchableOpacity>
  )
};

export default function NotificationScreen({ navigation }) {
  let [notifications, setNotifications] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");
  let [originallResponse, setResponse] = useState({});

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        setError("Please First Login Or Register");
        setResponse({});
        BackHandler.exitApp();
        return;
      }
      const response = await axios.get(api.getNotifications, {
        headers: { "auth-token": `Bearer ${token}` }
      });
      if (!response || response.status !== 200 || !response.data.data) {
        setLoading(true);
        setResponse({});
        setError("Please Check You're Connection");
        BackHandler.exitApp();
        return;
      }
      setNotifications(response.data.data);
      setLoading(true);
    }
    catch (e) {
      setLoading(true)
      console.log("error in FetchNotifications : ", e);
    }
  }
  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} navigation={navigation} setError={setError} />}
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: StatusBar.currentHeight
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: "auto",
    marginLeft: 20
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  textRow: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: 4,

  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  email : {
    fontSize : 13 ,
    fontWeight :  "300",
    color : "gray"
  } ,
  message: {
    color: '#ddd',
    fontSize: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  postImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    marginLeft: 10,
  },
});
