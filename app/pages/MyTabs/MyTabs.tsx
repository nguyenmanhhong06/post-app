import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
// import { Image } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const img = require('../../../assets/Adidas.png');
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cart from '../Cart/Cart';
import Profile from '../Profile/Profile';
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={25} color="#ccc" />
            // <Image source={img} />
          ),
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: 10,
            color: 'black',
            fontWeight: '600',
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={25} color="#ccc" />
            // <Image source={img} />
          ),
          tabBarLabel: 'Cart',
          tabBarLabelStyle: {
            fontSize: 10,
            color: 'black',
            fontWeight: '600',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={25} color="#ccc" />
            // <Image source={img} />
          ),
          tabBarLabel: 'User',
          tabBarLabelStyle: {
            fontSize: 10,
            color: 'black',
            fontWeight: '600',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
