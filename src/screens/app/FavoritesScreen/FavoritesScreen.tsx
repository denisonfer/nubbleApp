import React from 'react';

import { InfinityScrollList, Screen, Text } from '@components';
import { postReactionService, TPostReaction } from '@domains';
import { ListRenderItemInfo } from 'react-native';
import { EQueryKeys } from '@infra';

export function FavoritesScreen() {
  function renderItem({ item }: ListRenderItemInfo<TPostReaction>) {
    return <Text>{item.id}</Text>;
  }

  return (
    <Screen>
      <Text preset="headingLarge">Favorites Screen</Text>
      <InfinityScrollList
        queryKey={EQueryKeys.UseFavoriteList}
        renderItem={renderItem}
        getList={({ page }) =>
          postReactionService.getMyReactions({
            reactionType: 'favorite',
            page,
          })
        }
        emptyListProps={{
          emptyMessage: 'Não há favoritos',
          errorMessage: 'Erro ao carregar favoritos',
        }}
      />
    </Screen>
  );
}
