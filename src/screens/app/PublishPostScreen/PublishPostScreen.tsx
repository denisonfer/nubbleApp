import { Box, Button, Input, Screen, Text } from '@components';
import { TAppScreenProps } from '@routes';
import { useState } from 'react';
import { Dimensions, Image } from 'react-native';

const IMAGE_WIDTH = Dimensions.get('window').width / 2;

export function PublishPostScreen({
  route,
}: TAppScreenProps<'PublishPostScreen'>) {
  const [caption, setCaption] = useState('');

  return (
    <Screen title="Novo Post" addHeaderPadding canGoBack>
      <Image
        source={{ uri: route.params.imageUri }}
        style={{ width: IMAGE_WIDTH, height: IMAGE_WIDTH, alignSelf: 'center' }}
      />
      <Box p="spc24" gap="spc16">
        <Text preset="headingSmall">Escreva uma legenda</Text>
        <Input
          placeholder="Digite aqui"
          value={caption}
          onChangeText={setCaption}
        />
      </Box>
      <Button title="Publicar post" onPress={() => {}} mx="spc24" mt="spc48" />
    </Screen>
  );
}
