# Calendar Carousel


## Description

A Calendar UI that can be swiped horizontally. By default, this calendar displays the current date with a blue circle. Dates can be swiped infinitely and moving through the dates is also possible through clicking the next button arrow.

For an even closer description on how the CalendarCarousel was made, you can read this medium article.
English : [CalendarCarousel](https://medium.com/@jessielee.shl/the-making-of-dooboo-uis-calendar-carousel-74bf8b0579a9)
Korean : [CalendarCarousel](https://medium.com/@jessielee.shl/dooboo-ui-calendar-carousel-%EC%A0%9C%EC%9E%91%EA%B3%BC%EC%A0%95-43de8a9e5ad6)

#### Preview
![89981559-076a0e80-dcaf-11ea-96bf-f48433c518c6](https://user-images.githubusercontent.com/59305253/90607691-87a6eb80-e23c-11ea-8677-67a346911be6.gif)

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
- Intl is used to print out the names of the months. 

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
The Calendar Carousel is a functional component that returns three functions 'renderCalendar()' wrapped inside of a ScrollView.


```tsx
    <SafeAreaView
      style={styles.wrapperContainer}
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
        {renderCalendars()}
      </ScrollView>
    </SafeAreaView>
```

### renderCalendars()

The function renderCalendars() renders three calendars that will load the previous current and next month calendars.
It also containes the function renderCalendar() which is described below. 

```tsx
<View style={styles.rowContainer}>
      {renderCalendar(prevMonth)}
      {renderCalendar(currentDate)}
      {renderCalendar(nextMonth)}
    </View>;
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

In addition to rendering the calendar, renderCalendar() renders the dates and the events marked on the dates with the renderdates() function and the renderEvents() function. 

### renderDates()

#### Display Features
- hasEvent() 

  : checks if a date has a marked event within it and displays a small blue circle if it is. 

  return value = boolean

- isSelected() 

  : checks if a date is selected by the user and displays a light blue circle if it is. 

  return value = boolean

- isToday() 
  
  : checks if a date rendered in the calendar is today's date and displays a blue circle if it is.

  return value = boolean


### renderEvent()

Takes the data markedDayEvents that is recieved from the props and renders the events based on that. 

```tsx
      const renderEvent = (): ReactElement[] => {
        return markedDayEvents.map((markedDayEvent, i) => {
          if (markedDates[i] === eventDay &&
            markedMonths.includes(month) &&
            markedYears.includes(year)) {
            return (
              <View style = {styles.eventContainer} key ={i}>
                <Text style= {styles.eventDate}>{markedDayEvents[i].selectedEventDate.getDate()}</Text>
                <Text style = {styles.eventText}>{markedDayEvents[i].events}</Text>
              </View>
            );
          }
        });
      }
```
### Changing Date Features

There are to ways to scroll through this calendar. changeMonth() is called when the left/right button is pressed. ScrollView is what is called when the user scrolls to the next month.

#### changeMonth()

```tsx
  const changeMonth = (toPrevMonth?: boolean): void => {
    if (toPrevMonth) {
      const update = prevMonth;

      setCurrentDate(update);
      return onDateChanged?.(update);
    }
    const update = nextMonth;

    setCurrentDate(update);
    return onDateChanged?.(update);
  };
```

#### ScrollView - scrollEffect

```tsx
  const scrollEffect = (e: NativeSyntheticEvent<NativeScrollEvent>) : void => {
    const xValue = Math.floor(e.nativeEvent.contentOffset.x);
    const maxLayoutFloor = Math.floor(layoutWidth) * 2;
    if (!layoutWidth || layoutWidth === 1) return;

    if (xValue === 0) {
      if (scrollRef && scrollRef.current) {
        scrollToMiddleCalendar();
        setCurrentDate(prevMonth);
      }
    } else if (xValue === maxLayoutFloor) {
      if (scrollRef && scrollRef.current) {
        scrollToMiddleCalendar();
        setCurrentDate(nextMonth);
      }
    }
  };
```

