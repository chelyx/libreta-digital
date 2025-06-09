import React from 'react';
import { Button, View, Text } from 'react-native';
import { useAuth0 } from '@auth0/auth0-react';

export default function BackendExample() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [response, setResponse] = React.useState<string | null>(null);

  const callBackend = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch('http://localhost:8080/api/hello', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setResponse(JSON.stringify(data));
    } catch (e: any) {
      setResponse('Error: ' + (e?.message || e));
    }
  };

  return (
    <View style={{ margin: 20 }}>
      {isAuthenticated && (
        <Button title="Llamar al backend protegido" onPress={callBackend} />
      )}
      {response && <Text>{response}</Text>}
    </View>
  );
}
