import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registerApi } from '../../apis/user_api';
import { saveAccessToken, saveProfileTo } from '../../ultills/auth';

function SignUp({ navigation }) {
  const [body, setBody] = React.useState({ email: '', password: '', full_name: '' });
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 30,
          alignItems: 'center',
          marginTop: 100,
          gap: 10,
        }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Sign Up</Text>
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
            Full Name
          </Text>
          <TextInput
            onChangeText={text => setBody({ ...body, full_name: text })}
            style={{
              color: 'black',
              borderBottomWidth: 1,
              borderBottomColor: '#E7E8EA',
              paddingVertical: 5,
              fontSize: 14,
            }}
            keyboardType="default"
            placeholder="Type your username here..."
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
        <View style={{ marginTop: 20 }}>
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
        <TouchableOpacity
          onPress={async () => {
            const result = await registerApi(body);
            saveAccessToken(result.data.result.access_token);
            saveProfileTo(result.data.result.user);
            navigation.navigate('MyTabs');
          }}
          style={{
            marginTop: 40,
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#6db5ca',
            borderRadius: 18,
          }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 15, marginTop: 20, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', gap: 5, marginBottom: 10 }}>
          <Text style={{ color: '#8F959E', fontSize: 12 }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontSize: 12, fontWeight: '600' }}>Login</Text>
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
export default SignUp;
