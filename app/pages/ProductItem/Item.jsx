import { faL } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { addtocart, getAllProductId } from '../../apis/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    img: '../../../assets/man.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    img: '../../../assets/man.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d723',
    img: '../../../assets/man.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d722',
    img: '../../../assets/man.png',
  },
];
const { width } = Dimensions.get('window');
function Item({ route, navigation }) {
  const [product, setProduct] = useState({});
  const [img, setImg] = useState([]);
  const [subImg, setSubImg] = useState([]);
  const [color, setColor] = useState([]);
  const { id } = route.params;
  useEffect(() => {
    fetchItem();
  }, []);
  async function fetchItem() {
    const result = await getAllProductId(id);
    setProduct(result.data.result);
    setImg(result.data.result.product_image);
    const subImgClone = [...result.data.result.product_sub_img];
    const arr = [];
    subImgClone.map(item => {
      arr.push({ id: item, img: item });
    });
    const subColorClone = [...result.data.result.color];
    const arrColor = [];
    subColorClone.map(item => {
      arrColor.push({ id: item, img: item });
    });
    setColor(arrColor);
    console.log(img);
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{}}>
          <Image
            source={{ uri: product.product_image }}
            style={{ width: width, height: 418 }}
            resizeMode="cover"
          />
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#1D1E20' }}>
              {product.product_name}
            </Text>
            <Text style={{ fontWeight: '600', color: '#1D1E20' }}>{product?.price}</Text>
          </View>
          <FlatList
            horizontal={true}
            data={subImg}
            style={{ marginTop: 10, width: width }}
            renderItem={({ item }) => (
              <View key={item.id} style={{ width: 77, height: 77, marginHorizontal: 3 }}>
                <TouchableOpacity
                  onPress={() => {
                    setImg(item.img);
                  }}>
                  <Image
                    source={{ uri: item.img }}
                    key={item.id}
                    style={{
                      width: 77,
                      height: 77,
                      objectFit: 'cover',
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1D1E20', marginBottom: 10 }}>
              Color
            </Text>
            <FlatList
              horizontal={true}
              data={color}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item }) => (
                <View
                  key={item.id}
                  style={{
                    padding: 10,
                    backgroundColor: '#F5F6FA',
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity>
                    <Text style={{ fontWeight: '600', color: '#1D1E20' }}>{item.img}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1D1E20', marginBottom: 10 }}>
              Description
            </Text>
            <Text style={{ color: '#8F959E' }}>{product.description}</Text>
            {/* <ScrollView style={{ height: 130 }}>
            </ScrollView> */}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          zIndex: 100,
          position: 'relative',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          paddingBottom: 30,
        }}>
        <TouchableOpacity
          onPress={async () => {
            const token = await AsyncStorage.getItem('access_token');
            const result = await addtocart(product._id, token);
            alert('Thanks for add my product to cart!!');
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: '#E2E1E6',
              borderRadius: 10,
            }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>Add to cart</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert('Thank you for buy my product!!');
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: '#000',
              borderRadius: 10,
            }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>Buy now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
});
export default Item;
