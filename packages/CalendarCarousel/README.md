# Calendar Carousel

## Description

This is a Calendar Carousel that displays each month. It automatically moves on to the next year so you can swipe infinitely through the dates. 

#### Features of this Calendar Include
Display Current Date with a blue circle
Display Selected Date with a light blue circle
Scroll Through each of the months (will automatically load to the next year on December)


#### Language
- React-Native : FlatList, StyleSheet, SafeAreaView, Text, Texstyle...
- typescript 

## Visuals

#### Final Design Plan

![Calendar Carousel](https://user-images.githubusercontent.com/59305253/87650055-0f0bc580-c78c-11ea-9396-2c0230302337.png)

#### Demo

![Calendar Carousel Final](https://user-images.githubusercontent.com/59305253/87649593-75441880-c78b-11ea-96a5-24563ae43f7a.png)

## Props
|   Props   |   Types   |                Description                              |   Required |          Default         | 
|-----------|-----------|---------------------------------------------------------|------------|--------------------------|
|   date    |   Date.   |  The date that the user loads on default                |  required. | new Date()               |
|.  year    |   number. |  The year of the date in four digit form ex)2020        |  required. | new Date().getFullYear() |
|   month   |   number. |. Index of the loaded month based on date      (0~11 )   |  requried  | new Date().getMonth()    |
|.swipeLeft |  function |  Loads next month by adding month & year                |  requried  | x                        |
| swipeRight|  function |  Loads the previous month by subtracting month & year.  |. requried  | x                        |


## Getting started

#### Installation

```
yarn add dooboo-ui
```
#### Import

```
import { CalendarCarousel } from 'dooboo-ui';
import { CalendarCarousel } from 'dooboo-ui/lib/CalendarCarousel';
```

#### Calendar Carousel Calendar Component Example

```
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



