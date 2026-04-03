import { EQueryKeys, usePaginatedList } from '@infra';
import { useScrollToTop } from '@react-navigation/native';
import React, { useRef } from 'react';
import { FlatList, FlatListProps, RefreshControl } from 'react-native';
import { EmptyList, TEmptyListProps } from './components/EmptyList';

type TItemTypeConstraints = {
  id: string | number;
};

type TInfinityScrollListProps<TItemType extends TItemTypeConstraints> = {
  queryKey: EQueryKeys;
  renderItem: FlatListProps<TItemType>['renderItem'];
  getList: Parameters<typeof usePaginatedList<TItemType>>[1];
  flatListProps?: Omit<
    Partial<FlatListProps<TItemType>>,
    'data' | 'renderItem' | 'keyExtractor'
  >;
  emptyListProps?: Pick<TEmptyListProps, 'emptyMessage' | 'errorMessage'>;
};

export function InfinityScrollList<TItemType extends TItemTypeConstraints>({
  queryKey,
  emptyListProps,
  flatListProps,
  renderItem,
  getList,
}: TInfinityScrollListProps<TItemType>) {
  const flatListRef = useRef<FlatList<TItemType>>(null);
  useScrollToTop(flatListRef);

  const { list, isLoading, isError, refetch, fetchNextPage } = usePaginatedList(
    [queryKey],
    getList,
  );

  return (
    <FlatList
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      data={list}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.1}
      refreshing={isLoading}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      contentContainerStyle={{ flex: list.length === 0 ? 1 : undefined }}
      ListEmptyComponent={
        <EmptyList
          isLoading={isLoading}
          error={isError}
          refetch={refetch}
          {...emptyListProps}
        />
      }
      {...flatListProps}
    />
  );
}
