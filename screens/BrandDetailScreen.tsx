import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  BrandDetailScreen: {
    brandName: string;
    brandDescription: string;
    brandImage: string;
    bestItems: Array<{ id: string; name: string; image: string }>;
  };
  CartScreen: undefined;
};


type BrandDetailScreenRouteProp = RouteProp<RootStackParamList, 'BrandDetailScreen'>;
type BrandDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BrandDetailScreen'>;

const BrandDetailScreen = () => {
  const route = useRoute<BrandDetailScreenRouteProp>();
  const navigation = useNavigation<BrandDetailScreenNavigationProp>();
  const { brandName, brandDescription, brandImage, bestItems } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: brandImage }} style={styles.backgroundImage} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>PET IN UNIVERSE</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#fff" />
        </TouchableOpacity>
        </View>

        <Text style={styles.brandName}>{brandName}</Text>
        <Text style={styles.description}>{brandDescription}</Text>

        {/* 베스트 아이템 섹션 */}
        <View style={styles.bestItemsContainer}>
          {bestItems.map(item => (
            <View key={item.id} style={styles.bestItemBox}>
              <Image source={{ uri: item.image }} style={styles.bestItemImage} />
              <Text style={styles.bestItemText}>{item.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>입장하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  brandName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 30,
  },
  bestItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  bestItemBox: {
    width: '48%',
    backgroundColor: '#444',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  bestItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  bestItemText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#ff1493',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BrandDetailScreen;
