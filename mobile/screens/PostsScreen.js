import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config/config';

export default function PostsScreen() {
  const [title, setTitle] = useState('');
  const [resultText, setResult] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState('');
  const [isPremium, setPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkPremiumStatus = async () => {
    try {
      const token  = await AsyncStorage.getItem("userToken");
      if(token){
          const response = await axios.get(api.checkPremium , {
            headers : {
            "auth-token" : `Bearer ${token}` ,
          }
        });
          if(!response || response.status !== 200){
            setPremium(false);
            Alert.alert("Hello" , "please check your connection");
          }
          setPremium(response.data.isPremium);
      }
      else{
        setPremium(false);
        Alert.alert("Hello" , "please login or register");
      }
    } catch (e) {
      console.log("error in checking isPremium or not :", e);
      setPremium(false);
    }
  };

  useEffect(() => {    
    checkPremiumStatus();
  }, []);

  const handleCreate = async (Premium) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Hello", "please first login or register !");
        return;
      }

      const response = await axios.post(
        api.uploadPost, 
        { title, description, isPremium : Premium ? true : false }, 
        { headers: { "auth-token": `Bearer ${token}` } }
      );

      if (response.status !== 200) {
        Alert.alert("Hello", "please first check your connection");
        setError(response.data.message);
        return;
      }
      
      setResult(response.data.message);
      setError("");
    } catch (e) {
      console.log("error in the client for getting the posts :", e);
      setError("An error occurred while creating the post");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Post</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />
        <Ionicons name="pencil-outline" size={20} color="#888" style={styles.icon} />
      </View>

      <View style={[styles.inputBox, { height: 100 }]}>
        <TextInput
          style={[styles.input, { height: '100%' }]}
          placeholder="Description"
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Ionicons name="document-text-outline" size={20} color="#888" style={styles.icon} />
      </View>

      {resultText ? (
        <Text style={{ color: "green" }}>{resultText}</Text>
      ) : (
        <Text style={{ color: "red" }}>{error}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={()=>{
        handleCreate(false);
      }}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>

      {isPremium && (
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#555' }]} 
          onPress={() => {
            setPremium(true);
            handleCreate(true);
          }}
        >
          <Text style={styles.buttonText}>Create Premium Post</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    color: 'white',
    width: '90%',
    fontSize: 16,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
});