# Calendar Carousel


## Description

A Calendar UI that can be swiped horizontally. By default, this calendar displays the current date with a blue circle. Dates can be swiped infinitely and moving through the dates is also possible through clicking the next button arrow.

For an even closer description on how the CalendarCarousel was made, you can read this medium article.
English : [CalendarCarousel](https://medium.com/@jessielee.shl/the-making-of-dooboo-uis-calendar-carousel-74bf8b0579a9)
Korean : [CalendarCarousel](https://medium.com/@jessielee.shl/dooboo-ui-calendar-carousel-%EC%A0%9C%EC%9E%91%EA%B3%BC%EC%A0%95-43de8a9e5ad6)

#### Features of this Calendar Include
- Display Current Date with a blue circle
- Display Selected Date with a light blue circle
- Scroll Through each of the months (Automatic load to next month)
- Dates that have events marked will display the corresponding event

#### What is used

- React-Native components listed below are used.
```
FlatList,
NativeScrollEvent,
NativeSyntheticEvent,
SafeAreaView,
ScrollView,
StyleSheet,
Text,
TextStyle,
TouchableOpacity,
View,
ViewStyle,
```
- The default javascript Date object is used to print out the dates, month titles, month, and year.
- The arrow buttons are made with general HTML symbols.

#### Preview

#### Language
- React-Native : FlatList, StyleSheet, SafeAreaView, Text, Texstyle...
- typescript 


## Props
|   Props   |   Types   |                Description                              |   Required |          Default         | 
|-----------|-----------|---------------------------------------------------------|------------|--------------------------|
|   date    |   Date.   |  The date that the user loads on default                |  required. | new Date()               |
|   year    |   number. |  The year of the date in four digit form ex)2020        |  required. | new Date().getFullYear() |
|   month   |   number. |. Index of the loaded month based on date      (0~11 )   |  requried  | new Date().getMonth()    |
| swipeLeft |  function |  Loads next month by adding month & year                |  requried  | x                        |
| swipeRight|  function |  Loads the previous month by subtracting month & year.  |. requried  | x                        |
| markedDayEvents |  Object data array |  Default data for marked days with events  | optional  | x                        |


## Getting started

#### Installation

```tsx
yarn add dooboo-ui
```
#### Import

```tsx
import { CalendarCarousel } from 'dooboo-ui';
import { CalendarCarousel } from 'dooboo-ui/lib/CalendarCarousel';
```

#### Calendar Carousel Calendar Component Example

```tsx
<Container>
  <ScrollView horizontal>
    <CalendarCarousel
      date={new Date()}
      year={year}
      month={month}
      swipeLeft={setPrevMonth}
      swipeRight={setNextMonth}
    />
  </ScrollView>
</Container>

```
### CalendarCarousel
The Calendar Carousel is a functional component that returns the function 'renderCalendars()' wrapped inside of a ScrollView.

```tsx
<SafeAreaView
  style={styles.container}
  onLayout={(e): void => {
    setLayoutWidth(e.nativeEvent.layout.width);
    scrollToMiddleCalendar();
  }}>
  <ScrollView
    horizontal
    pagingEnabled
    scrollEventThrottle={16}
    contentOffset = {{ x: layoutWidth, y: 0 }}
    ref={scrollRef}
    onMomentumScrollEnd={scrollEffect}
  >
    {renderCalendars(currentDate)}
  </ScrollView>
</SafeAreaView>
```

### renderCalendars() 


The function renderCalendars() renders three calendars representing the previous, current, and next month. Then scrollView wraps these three calendars and swipes through them horizontally.

```tsx
const renderCalendars = (currentDate: Date): ReactElement => {
const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
return <Fragment>
  {renderCalendar(prevMonth)}
  {renderCalendar(currentMonth)}
  {renderCalendar(nextMonth)}
</Fragment>;
};
```


### renderCalendar()

* Note here that renderCalendar and renderCalendars are two different functions. renderCalendar() is the function that renders a 'single' calendar while renderCalendars will render three calendars (prev, current, and next months).

```tsx
<View>
  <View style={styles.headerStyle}>
    <TouchableOpacity onPress={(): void => changeMonth(true)}>
      <Text style={styles.arrowText}> &#8249;</Text>
    </TouchableOpacity>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{monthName}</Text>
      <Text style={styles.yearText}>{year}</Text>
    </View>
    <TouchableOpacity onPress={(): void => changeMonth(false)}>
      <Text style={styles.arrowText}>&#8250;</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.weekdayStyle}>{weekdays}</View>
  <FlatList
    style={styles.dayContainer}
    data={calendarDates}
    numColumns={7}
    renderItem ={({ item }): ReactElement => renderDates(item)}
    keyExtractor={(item, id): string => id.toString()}
  />
  {renderDayEvents()}
</View>
```

