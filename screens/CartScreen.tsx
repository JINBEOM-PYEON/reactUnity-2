import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: string;
};

type RootStackParamList = {
  Home: undefined;
  CartScreen: undefined;
};

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CartScreen'>;

const CartScreen = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: '강아지 의상 1',
      image: 'https://via.placeholder.com/100x100',
      price: '20,000원',
    },
    {
      id: '2',
      name: '강아지 악세사리 2',
      image: 'https://via.placeholder.com/100x100',
      price: '15,000원',
    },
  ]);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 상단 헤더 부분 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* 장바구니 리스트 */}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
      />

      {/* 구매하기 버튼 */}
      <TouchableOpacity style={styles.purchaseButton}>
        <Text style={styles.purchaseButtonText}>구매 하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#1c1c1c',
    padding: 10,
    borderRadius: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cartItemDetails: {
    marginLeft: 10,
  },
  cartItemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    color: '#b2ff00',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  purchaseButton: {
    backgroundColor: '#b2ff00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  purchaseButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
