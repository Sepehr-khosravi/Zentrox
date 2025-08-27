import React from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Text } from 'react-native';
import Navbar from '../components/main/Home/navbar';
import PremiumPosts from '../components/main/Home/PremiumPosts';
import NormalPosts from '../components/main/Home/NormalPosts';

export default function HomeScreen({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refreshFlag, setRefreshFlag] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshFlag(prev => !prev); 
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <>
      <Navbar navigation={navigation} />
      <ScrollView
        style={styles.mainContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#000']}
            tintColor="#fff"
          />
        }
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Posts</Text>
          <PremiumPosts refreshFlag={refreshFlag} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <NormalPosts refreshFlag={refreshFlag} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
});
