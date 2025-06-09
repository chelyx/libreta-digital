import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useAuthRequest, makeRedirectUri, ResponseType } from 'expo-auth-session';
import Constants from 'expo-constants';

const discovery = {
  authorizationEndpoint: `https://${Constants.expoConfig?.extra?.auth0Domain}/authorize`,
  tokenEndpoint: `https://${Constants.expoConfig?.extra?.auth0Domain}/oauth/token`,
  userInfoEndpoint: `https://${Constants.expoConfig?.extra?.auth0Domain}/userinfo`,
};

const redirectUri = makeRedirectUri();

// Tipado para userInfo
interface UserInfo {
  name?: string;
  email?: string;
  [key: string]: any;
}

export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const auth0Domain = Constants.expoConfig?.extra?.auth0Domain;
  const auth0ClientId = Constants.expoConfig?.extra?.auth0ClientId;

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: auth0ClientId,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      responseType: ResponseType.Token,
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success' && response.params?.access_token) {
      (async () => {
        try {
          const res = await fetch(`https://${auth0Domain}/userinfo`, {
            headers: {
              Authorization: `Bearer ${response.params.access_token}`,
            },
          });
          const user = await res.json();
          setUserInfo(user);
        } catch (e) {
          setUserInfo(null);
        }
      })();
    }
  }, [response]);

  const login = () => {
    promptAsync();
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <View style={{ padding: 20 }}>
      {userInfo ? (
        <>
          <Text>Bienvenido, {userInfo.name || userInfo.email}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Button title="Login con Auth0" onPress={login} disabled={!request} />
      )}
    </View>
  );
}
