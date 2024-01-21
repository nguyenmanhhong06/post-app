import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import cart from '../../../assets/Cart.png';
import search from '../../../assets/Search.png';
import adidas from '../../../assets/Adidas.png';
import man from '../../../assets/man.png';
import heart from '../../../assets/Heart.png';
import { getProfile } from '../../ultills/auth';
import { getAllProduct, searchProduct, searchProductList } from '../../apis/user_api';
function Home({ navigation }) {
  const [profile, setProfile] = useState({});
  const [key, setKey] = useState('');
  const [DATA, setData] = useState({});
  const [dataSearch, setDataSearch] = useState('');
  useEffect(() => {
    getProfile().then(res => {
      setProfile(res);
    });
    getAllProduct().then(res => {
      setData(res.data.result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 26, fontWeight: '600', color: '#1D1E20' }}>
            Hello {profile?.full_name},
          </Text>
          <Text style={{ fontSize: 13, color: '#8F959E' }}>Welcome to App</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={cart} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          padding: 15,
          marginVertical: 20,
          backgroundColor: '#F5F6FA',
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            alignItems: 'center',

            gap: 10,
          }}>
          <TextInput
            style={{
              color: 'black',
              fontSize: 14,
              width: '100%',
            }}
            onChangeText={text => setKey(text)}
            keyboardType="default"
            placeholder="Search..."
          />
        </View>
        <TouchableOpacity
          onPress={async () => {
            if (key) {
              const result = await searchProduct(key);
              setDataSearch(result.data.result);
            } else {
              setDataSearch('');
            }
          }}>
          <Image source={search} />
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1D1E20' }}>Choose Brand</Text>
        </View>
        <View style={{ gap: 10 }}>
          <ScrollView horizontal={true} style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                padding: 10,
                backgroundColor: '#F5F6FA',
                marginRight: 10,
                borderRadius: 12,
              }}>
              <TouchableOpacity
                onPress={async () => {
                  const result = await searchProductList(0);
                  setDataSearch(result.data.result);
                }}
                style={{
                  padding: 8,
                  backgroundColor: '#FEFEFE',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Icon name="tv" size={15} color="#000" />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1D1E20' }}>Tivi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const result = await searchProductList(1);
                  setDataSearch(result.data.result);
                }}
                style={{
                  padding: 8,
                  backgroundColor: '#FEFEFE',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Icon name="mobile" size={20} color="#000" />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1D1E20' }}>Mobile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const result = await searchProductList(2);
                  setDataSearch(result.data.result);
                }}
                style={{
                  padding: 8,
                  backgroundColor: '#FEFEFE',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Icon name="laptop" size={20} color="#000" />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1D1E20' }}>Laptop</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const result = await searchProductList(3);
                  setDataSearch(result.data.result);
                }}
                style={{
                  padding: 8,
                  backgroundColor: '#FEFEFE',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Image
                  source={{
                    uri: 'https://png.pngtree.com/png-clipart/20220621/original/pngtree-a-grey-fridge-png-image_8173668.png',
                  }}
                  style={{ width: 25, height: 25 }}
                />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1D1E20' }}>Fridge</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const result = await searchProductList(4);
                  setDataSearch(result.data.result);
                }}
                style={{
                  padding: 8,
                  backgroundColor: '#FEFEFE',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFBOt5Du2ik71LA0_JxzDj97A-5hWQXGmJoLrTpjOQg&s',
                  }}
                  style={{ width: 25, height: 25 }}
                />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1D1E20' }}>
                  WashingMachine
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{ marginTop: 20, paddingBottom: 300 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: '#1D1E20' }}>Product</Text>
        {DATA && (
          <FlatList
            style={{ marginTop: 10 }}
            data={dataSearch || DATA}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={{ width: '45%', marginLeft: 10 }} key={item._id}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Item', {
                      id: item._id,
                    });
                  }}>
                  <View style={{ position: 'relative' }}>
                    <Image
                      source={{
                        uri: item.product_image,
                      }}
                      style={{ width: 160, height: 203 }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 120,
                        padding: 5,
                        backgroundColor: '#fff',
                        borderRadius: 12,
                      }}>
                      <Image source={heart} />
                    </View>
                  </View>
                  <Text style={{ fontSize: 12, color: '#1D1E20' }}>{item.product_name}</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1D1E20' }}>
                    {item.price}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        )}
        {/* <ScrollView accessibilityRole="scrollbar">
          {Array(5)
            .fill(0)
            .map(item => (
              
            ))}
        </ScrollView> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
export default Home;
