import { TOnboardingScreenProps } from '@routes';
import React, { useRef, useState } from 'react';
import { OnboardingPage } from './components/OnboardingPage';
import { Box } from '@components';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { TOnboardingItem, onboardingData } from './components/OnboardingData';

export function OnboardingScreen({}: TOnboardingScreenProps<'OnboardingScreen'>) {
  const flatListRef = useRef<FlatList>(null);

  const [pageIndex, setPageIndex] = useState(0);

  const handleScrollToNextPage = () => {
    const isLastPage = pageIndex === onboardingData.length - 1;
    console.log('isLastPage', isLastPage);
    if (isLastPage) {
      handleFinishOnboarding();
      return;
    }

    const nextPageIndex = pageIndex + 1;
    flatListRef.current?.scrollToIndex({
      index: nextPageIndex,
      animated: true,
    });
    setPageIndex(nextPageIndex);
  };

  const handleFinishOnboarding = () => {
    //TODO: implement finish onboarding
  };

  const renderItem = ({ item }: ListRenderItemInfo<TOnboardingItem>) => {
    return (
      <OnboardingPage
        pageItem={item}
        onPressNext={handleScrollToNextPage}
        onPressSkip={handleFinishOnboarding}
      />
    );
  };

  return (
    <Box flex={1}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        horizontal
        scrollEnabled={false}
      />
    </Box>
  );
}
