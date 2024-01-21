import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Post({ route, navigation }) {
  const [data, setData] = useState();
  const { id, title } = route.params;
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id || 1}/comments`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => setData(json));
  }, []);
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={{ fontSize: 28, textAlign: 'center' }}>Post Detail</Text>
      <View style={{ padding: 10, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>ID: </Text>
          <Text style={{ marginRight: 10 }}>{id}</Text>{' '}
          <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Title: </Text>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});

export default Post;
