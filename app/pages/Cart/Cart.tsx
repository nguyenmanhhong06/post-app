import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteallcart, deletecart, getcart } from '../../apis/user_api';
import { useIsFocused } from '@react-navigation/native';
function Cart() {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [_, setState] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchCart();
  }, [_, isFocused]);

  async function fetchCart() {
    const token = await AsyncStorage.getItem('access_token');
    const result = await getcart(token);
    console.log(result);
    setCart(result.data.result);
    let sum = 0;
    result.data.result.forEach((item: any) => {
      sum += parseFloat(item.result.price.replace(/\./g, '')) * item.amount;
    });
    setPrice(sum);
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flex: 5 }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#1D1E20' }}>Cart</Text>
      </View>
      <View style={{ flex: 85 }}>
        {cart.length ? (
          <FlatList
            data={cart}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{}}>
                  <Image
                    source={{ uri: item.result.product_image }}
                    style={{ width: 100, height: 130, objectFit: 'cover' }}
                  />
                </View>
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    flex: 100,
                  }}>
                  <View style={{ flex: 85 }}>
                    <Text>{item.result.product_name}</Text>
                    <Text>{item.result.price}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15,
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          padding: 10,
                          borderColor: '#E7E8EA',
                          borderWidth: 1,
                          borderRadius: 99,
                        }}>
                        <Icon name="chevron-up" size={15} color="#ccc" />
                      </View>
                      <Text style={{ fontSize: 14, fontWeight: '600' }}>
                        {amount || item.amount}
                      </Text>
                      <View
                        style={{
                          padding: 10,
                          borderColor: '#E7E8EA',
                          borderWidth: 1,
                          borderRadius: 99,
                        }}>
                        <Icon name="chevron-down" size={15} color="#ccc" />
                      </View>
                    </View>
                  </View>
                  <View style={{ flex: 15, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View
                      style={{
                        padding: 10,
                        borderColor: '#E7E8EA',
                        borderWidth: 1,
                        borderRadius: 99,
                      }}>
                      <TouchableOpacity
                        onPress={async () => {
                          const result = await deletecart(
                            item._id,
                            await AsyncStorage.getItem('access_token')
                          );
                          console.log(result);
                          setState(1);
                        }}>
                        <Icon name="trash" size={15} color="#ccc" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}></FlatList>
        ) : (
          <Text style={{ textAlign: 'center' }}>Please add the product to your cart</Text>
        )}
      </View>
      <View style={{ flex: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>Tổng giá tiền</Text>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>
            {price.toLocaleString('vi-VN')} VNĐ
          </Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            await deleteallcart(await AsyncStorage.getItem('access_token'));
            setState(1);
          }}
          style={{
            backgroundColor: '#4c8df6ff',
            padding: 10,
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 3,
          }}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
export default Cart;
