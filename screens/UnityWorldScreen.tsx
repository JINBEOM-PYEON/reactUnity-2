import React, { useRef, useEffect } from 'react';

import UnityView from '@azesmway/react-native-unity';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

type RootStackParamList = {
  UnityWorldScreen: undefined;
};

type UnityWorldScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UnityWorldScreen'>;

const Unity = () => {
  const unityRef = useRef<UnityView>(null);

  const navigation = useNavigation<UnityWorldScreenNavigationProp>();

  useEffect(() => {
    if (unityRef?.current) {
      const jsonObject = {
        id: 1,
        saved: true,
        petIndex: 0,
        petScale: 1.0,
        eyesIndex: 0,
        weight: 50,
        legLength: 50,
        neckLength: 50,
        tailLength: 50,
        furIndex: 0,
        clothesIndex: 0,
      };

      const jsonString = JSON.stringify(jsonObject);

      const message: IMessage = {
        gameObject: 'MessageHandler',
        methodName: 'ReceiveMessage',
        message: jsonString,
      };
      unityRef.current.postMessage(
        message.gameObject,
        message.methodName,
        message.message
      );
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <UnityView
        ref={unityRef}
        style={{ flex: 1 }}
        onUnityMessage={(result) => {
          console.log('onUnityMessage', result.nativeEvent.message);
          navigation.goBack();
          if (unityRef.current) {
            unityRef.current.unloadUnity();
          }
        }}
      />
    </View>
  );
};

export default Unity;