import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home({ navigation }) {
  const [data, setData] = useState();
  const [id, setId] = useState(1);
  const [comment, setComment] = useState();
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        setData(json);
      });
  }, []);
  useEffect(() => {
    if (data) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id || 1}/comments`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(json => setComment(json));
    }
  }, [id, data]);
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={{ fontSize: 28, textAlign: 'center' }}>Post</Text>
      <View>
        <FlatList
          scrollEnabled={false}
          data={data && data.slice(0, 5)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setId(item.id)}
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                paddingHorizontal: 10,
              }}>
              <View style={{}}>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>ID: </Text>
                  {item.id}
                </Text>
              </View>
              <View style={{}}>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>Title: </Text>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        data={comment}
        renderItem={({ item }) => (
          <View
            // onPress={() => navigation.navigate('Post', { id: item.id, title: item.title })}
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: '#ccc',
              paddingHorizontal: 10,
            }}>
            <View style={{}}>
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Name: </Text>
                {item.name}
              </Text>
            </View>
            <View style={{}}>
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                {item.email}
              </Text>
            </View>
            <View style={{}}>
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Body: </Text>
                {item.body}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
export default Home;
