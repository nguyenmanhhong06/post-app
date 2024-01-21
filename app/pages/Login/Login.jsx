import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getAllProduct, loginApi } from '../../apis/user_api';
import axios from 'axios';
import { saveAccessToken, saveProfileTo } from '../../ultills/auth';

function Login({ navigation }) {
  const [body, setBody] = React.useState({ email: '', password: '' });
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 30,
          alignItems: 'center',
          marginTop: 100,
          gap: 10,
        }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Welcome</Text>
        <Text style={{ color: '#8F959E' }}>Please enter your data to continue</Text>
      </View>
      <View
        style={{
          flex: 50,
          marginHorizontal: 20,
        }}>
        <View>
          <Text
            style={{
              fontSize: 11,
              color: '#8F959E',
            }}>
            Email
          </Text>
          <TextInput
            onChangeText={text => setBody({ ...body, email: text })}
            style={{
              color: 'black',
              borderBottomWidth: 1,
              borderBottomColor: '#E7E8EA',
              paddingVertical: 5,
              fontSize: 14,
            }}
            keyboardType="default"
            placeholder="Type your email here..."
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
            onChangeText={text => setBody({ ...body, password: text })}
            style={{
              color: 'black',
              borderBottomWidth: 1,
              borderBottomColor: '#E7E8EA',
              paddingVertical: 5,
              fontSize: 14,
            }}
            keyboardType="default"
            placeholder="Type your password here..."
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={{
            marginTop: 40,
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#6db5ca',
            borderRadius: 18,
          }}
          onPress={async () => {
            // const result = await loginApi(body);
            // saveAccessToken(result.data.result.access_token);
            // saveProfileTo(result.data.result.user);
            navigation.navigate('MyTabs');
          }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 15, marginTop: 20, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', gap: 5, marginBottom: 10 }}>
          <Text style={{ color: '#8F959E', fontSize: 12 }}>Already don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ fontSize: 12, fontWeight: '600' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#8F959E', fontSize: 12 }}>
          By connecting your account confirm that you agree with our{' '}
          <Text style={{ color: '#1D1E20', fontSize: 12, fontWeight: 'bold' }}>
            Term and Condition
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});

export default Login;
