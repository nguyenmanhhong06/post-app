import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getMe, updateMe } from '../../apis/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveProfileTo } from '../../ultills/auth';

function Profile({ navigation }) {
  const [body, setBody] = React.useState({ email: '', password: '', full_name: '' });
  useEffect(() => {
    fetch();
  }, []);
  async function fetch() {
    const token = await AsyncStorage.getItem('access_token');
    const result = await getMe(token);
    console.log(result.data.result);
    setBody({
      email: result.data.result.email,
      password: result.data.result.password,
      full_name: result.data.result.full_name,
    });
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#1D1E20' }}>Edit Profile</Text>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 11,
              color: '#8F959E',
            }}>
            Email
          </Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            onChangeText={text => setBody({ ...body, email: text })}
            defaultValue={body.email}
            style={{
              color: 'black',
              borderColor: '#A9A9A9',
              borderWidth: 1,
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 10,
              marginTop: 5,
              fontSize: 14,
            }}
            keyboardType="default"
            placeholder="Type your password here..."
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 11,
              color: '#8F959E',
            }}>
            Full Name
          </Text>
          <TextInput
            defaultValue={body.full_name}
            onChangeText={text => setBody({ ...body, full_name: text })}
            style={{
              color: 'black',
              borderColor: '#A9A9A9',
              borderWidth: 1,
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 10,
              marginTop: 5,
              fontSize: 14,
            }}
            keyboardType="default"
            placeholder="Type your password here..."
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 11,
              color: '#8F959E',
            }}>
            Password
          </Text>
          <TextInput
            defaultValue={body.password}
            onChangeText={text => setBody({ ...body, password: text })}
            style={{
              color: 'black',
              borderColor: '#A9A9A9',
              borderWidth: 1,
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 10,
              marginTop: 5,
              fontSize: 14,
            }}
            keyboardType="default"
            placeholder="Type your password here..."
            secureTextEntry={true}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={async () => {
          const token = await AsyncStorage.getItem('access_token');
          const result = await updateMe(token, body);
          // saveProfileTo(result.data.result.user);
          navigation.navigate('Home');
        }}
        style={{
          marginTop: 40,
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#000000',
          borderRadius: 18,
          marginHorizontal: 130,
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.navigate('Login');
        }}
        style={{
          marginTop: 40,
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#e7700d',
          borderRadius: 18,
          marginHorizontal: 130,
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});
export default Profile;
