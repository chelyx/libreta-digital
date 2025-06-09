import React from 'react';
import { Button, View, Text } from 'react-native';
import { useAuth0 } from '@auth0/auth0-react';
import BackendExample from './BackendExample';

export default function LoginScreen() {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const handleGetToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      alert('Access Token: ' + token);
    } catch (e: any) {
      alert('Error obteniendo token: ' + (e?.message || e));
    }
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isAuthenticated ? (
        <>
          <Text>Bienvenido, {user?.name || user?.email}</Text>
          <Button title="Obtener Access Token" onPress={handleGetToken} />
          <Button title="Logout" onPress={handleLogout} />
          <BackendExample />
        </>
      ) : (
        <Button title="Login con Auth0" onPress={() => loginWithRedirect()} />
      )}
    </View>
  );
}
