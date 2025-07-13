import BottomSheet from '@gorhom/bottom-sheet'
import LinearGradient from 'react-native-linear-gradient'
import React, { useMemo, useRef, useState, useEffect, FC } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import MainSearchBar from '@/screens/HomeScreen/components/MainSearchBar'
import { colors } from '@/constants/colors'
import useDarkmode from '@/hooks/useDarkmode'
import { fonts } from '@/constants/fonts'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated'

/* -------------------------------------------------------------------------- */
/*                             상단 태그(지역 선택)                             */
/* -------------------------------------------------------------------------- */
const AVAILABLE_LOCATION = {
  전체: 8,
  포토이즘: 3,
  인생네컷: 3,
  하루필름: 2,
} as const

type LocationKey = keyof typeof AVAILABLE_LOCATION

/* -------------------------------------------------------------------------- */
/*                               정렬 필터 옵션                                */
/* -------------------------------------------------------------------------- */
const SORT_OPTIONS = ['거리순', '인기순'] as const

type SortKey = (typeof SORT_OPTIONS)[number]

/* -------------------------------------------------------------------------- */
/*                                 Dummy Data                                 */
/* -------------------------------------------------------------------------- */
interface PlaceItem {
  id: string
  title: string
  distance: string
  tags: string[]
  thumb: any // 이미지 경로(require)
}

const PLACE_MOCK: PlaceItem[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `${i}`,
  title: '인생네컷 롯데월드 어드벤처',
  distance: '300m',
  tags: ['디즈니', '원어스', '최고심'],
  thumb: require('@/assets/images/place1.png'), // 프로젝트에 더미 이미지 추가
}))

/* -------------------------------------------------------------------------- */
/*                           SearchBottomSheet MAIN                           */
/* -------------------------------------------------------------------------- */
interface SearchBottomSheetProps {
  bottomSheetIndex: number
  onChange: (index: number) => void
}

export default function SearchBottomSheet({
  bottomSheetIndex,
  onChange,
}: SearchBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['40%', '65%'], [])
  const isDarkMode = useDarkmode()
  const color = colors(isDarkMode)

  /** Shrink progress: 0 = 원본 크기, 1 = 축소 크기 */
  const shrinkProgress = useSharedValue(bottomSheetIndex > 0 ? 1 : 0)

  useEffect(() => {
    shrinkProgress.value = withTiming(bottomSheetIndex > 0 ? 1 : 0, {
      duration: 260,
    })
  }, [bottomSheetIndex, shrinkProgress])

  /** 활성 태그 */
  const [selectedLocation, setSelectedLocation] = useState<LocationKey>('전체')

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        detached
        index={0}
        snapPoints={snapPoints}
        onChange={onChange}
        style={styles.sheet}
        backgroundStyle={{ backgroundColor: color.background }}
        handleIndicatorStyle={{ backgroundColor: '#ccc' }}>
        <View style={styles.tagWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagScroller}>
            {Object.entries(AVAILABLE_LOCATION).map(([name, count]) => (
              <TagItem
                key={name}
                name={name as LocationKey}
                count={count}
                isActive={name === selectedLocation}
                shrinkProgress={shrinkProgress}
                onPress={() => setSelectedLocation(name as LocationKey)}
              />
            ))}
          </ScrollView>
        </View>

        {/* ─────────────── BottomSheet Contents ─────────────── */}
        <BottomSheetContents />
      </BottomSheet>
    </View>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 Tag Item                                   */
/* -------------------------------------------------------------------------- */
interface TagItemProps {
  name: LocationKey
  count: number
  isActive: boolean
  shrinkProgress: Animated.SharedValue<number>
  onPress: () => void
}

const TagItem: FC<TagItemProps> = ({
  name,
  count,
  isActive,
  shrinkProgress,
  onPress,
}) => {
  /** shrink 애니메이션 스타일 */
  const animatedTagStyle = useAnimatedStyle(() => {
    const width = interpolate(shrinkProgress.value, [0, 1], [126, 100.8])
    const height = interpolate(shrinkProgress.value, [0, 1], [82, 65.6])
    const fromBorder = isActive ? 5 : 3
    const borderWidth = interpolate(
      shrinkProgress.value,
      [0, 1],
      [fromBorder, 4],
    )
    return { width, height, borderWidth }
  })

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Animated.View
        style={[
          styles.tagBase,
          isActive ? styles.tagActive : styles.tagInactive,
          animatedTagStyle,
        ]}>
        {isActive ? (
          <LinearGradient
            colors={['#A18346', '#9B7063']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFillObject, styles.tagGradient]}>
            <TagText name={name} count={count} />
          </LinearGradient>
        ) : (
          <TagText name={name} count={count} />
        )}
      </Animated.View>
    </TouchableOpacity>
  )
}

/* -------------------------------------------------------------------------- */
/*                          BottomSheet Inner Contents                        */
/* -------------------------------------------------------------------------- */
function BottomSheetContents() {
  const [selectedSort, setSelectedSort] = useState<SortKey>('거리순')

  /* 필터 버튼 UI */
  const renderSortTabs = () => (
    <View style={styles.sortRow}>
      {SORT_OPTIONS.map(option => (
        <TouchableOpacity
          key={option}
          activeOpacity={0.9}
          onPress={() => setSelectedSort(option)}
          style={[
            styles.sortBtn,
            selectedSort === option
              ? styles.sortBtnActive
              : styles.sortBtnInactive,
          ]}>
          <Text style={styles.sortBtnText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  /* 장소 카드 렌더 */
  const renderPlaceCard = ({ item }: { item: PlaceItem }) => (
    <View style={styles.cardOuter}>
      <View style={styles.cardThumb}>
        <Image source={item.thumb} resizeMode="cover" />
      </View>
      <View style={{ flex: 1, padding: 12 }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDistance}>{item.distance}</Text>
        <View style={styles.tagRow}>
          {item.tags.map(tag => (
            <View key={tag} style={styles.cardTag}>
              <Text style={styles.cardTagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.heartBtn}>
        <Text style={{ color: '#A6A6A6', fontSize: 18 }}>♡</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.sheetContent}>
      <MainSearchBar />
      {renderSortTabs()}
      <FlatList
        data={PLACE_MOCK}
        keyExtractor={item => item.id}
        renderItem={renderPlaceCard}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Helper Component                              */
/* -------------------------------------------------------------------------- */
function TagText({ name, count }: { name: string; count: number }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}>
      <Text style={styles.tagTitle}>{name}</Text>
      <Text style={styles.tagCount}>{count}곳</Text>
    </View>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  sheet: { overflow: 'visible' },

  /** 태그 영역 (지도 위) */
  tagWrapper: {
    position: 'absolute',
    top: -110,
    left: 0,
    right: 0,
    height: 82,
    zIndex: 99,
  },
  tagScroller: {
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 6,
  },
  tagBase: {
    width: 126,
    height: 82,
    borderRadius: 25,
    overflow: 'hidden',
  },
  tagActive: {
    borderWidth: 5,
    borderColor: '#F08809',
    shadowColor: '#C07272',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 6,
  },
  tagInactive: {
    borderWidth: 3,
    borderColor: '#F08809',
    backgroundColor: 'rgba(45, 45, 45, 0.80)',
    shadowColor: '#C07272',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 3,
  },
  tagGradient: { justifyContent: 'center' },
  tagTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.mulish.bold,
    lineHeight: 22,
  },
  tagCount: {
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
    fontSize: 14,
    fontFamily: fonts.mulish.bold,
  },

  /* ------------------------------ Sheet Content ----------------------------- */
  sheetContent: {
    flex: 1,
    paddingHorizontal: 16,
  },

  /* ----------------------------- Sort Buttons ------------------------------ */
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16,
  },
  sortBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sortBtnActive: {
    backgroundColor: '#F08809',
  },
  sortBtnInactive: {
    backgroundColor: '#5A5A5A',
  },
  sortBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: fonts.mulish.bold,
  },
  filterIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#5A5A5A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ------------------------------ Place Card ------------------------------- */
  cardOuter: {
    flexDirection: 'row',
    backgroundColor: '#101010',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
  },
  cardThumb: {
    width: 87,
    height: 87,
    borderRadius: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontFamily: fonts.mulish.bold,
    fontSize: 16,
  },
  cardDistance: {
    color: '#F08809',
    marginTop: 4,
    fontFamily: fonts.mulish.bold,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  cardTag: {
    backgroundColor: '#5A5A5A',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardTagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  heartBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5A5A5A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
})
