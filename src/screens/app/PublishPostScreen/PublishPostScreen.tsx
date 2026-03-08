import { Box, Button, Input, Screen, Text } from '@components';
import { usePostCreate } from '@domains';
import { TAppScreenProps } from '@routes';
import { useToastServices } from '@services';
import { useCallback, useState } from 'react';
import { Dimensions, Image } from 'react-native';

const IMAGE_WIDTH = Dimensions.get('window').width / 2;

export function PublishPostScreen({
  route,
  navigation,
}: TAppScreenProps<'PublishPostScreen'>) {
  const [caption, setCaption] = useState('');
  const { showToast } = useToastServices();

  const { createPost, isLoading } = usePostCreate({
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AppBottomTab',
            state: {
              routes: [
                { name: 'HomeScreen' },
                { name: 'NewPostScreen' },
                { name: 'FavoritesScreen' },
                { name: 'MyProfileScreen' },
              ],
              index: 0,
            },
          },
        ],
      });
      showToast({
        type: 'success',
        message: 'Post publicado com sucesso',
      });
    },
    onError: () => {
      showToast({
        type: 'error',
        message: 'Erro ao publicar post',
      });
    },
  });

  const publishPost = useCallback(async () => {
    await createPost({ description: caption, imageUri: route.params.imageUri });
  }, [createPost, caption, route.params.imageUri]);

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
      <Button
        title="Publicar post"
        onPress={publishPost}
        mx="spc24"
        mt="spc48"
        isLoading={isLoading}
        disabled={caption.trim().length === 0 || isLoading}
      />
    </Screen>
  );
}
