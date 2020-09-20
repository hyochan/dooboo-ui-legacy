# Badge  
> [Badge] component that can be used inside product. Has `OpacityVisible` state, `badgeZero` state.  
<br/>
<br/>

## Preview 

| Badge(default) | Badge(color, count, showZero) |
| :---------------: | :--------------: |
| <img src="https://user-images.githubusercontent.com/37579661/92614370-eff66380-f2f6-11ea-9f46-35f5cc871a72.png" width= "50%"/> | <img src="https://user-images.githubusercontent.com/37579661/92614395-f553ae00-f2f6-11ea-9663-f507d62c0a7c.png" width= "50%"/> |

| Badge(maximumCount, opacityVisible) | Badge(border, textColor) | Badge(variant, position) |
| :---------------: | :--------------: | :-------------: |
| <img src="https://user-images.githubusercontent.com/37579661/92614433-01d80680-f2f7-11ea-99a5-ed89ff14216c.png" width= "100%"/> | <img src="https://user-images.githubusercontent.com/37579661/92614441-056b8d80-f2f7-11ea-9e40-0ca17b6db965.png" width= "100%"/> |  <img src="https://user-images.githubusercontent.com/37579661/92616226-ee2d9f80-f2f8-11ea-9573-7ebec6f36ce6.png" width= "100%"/> |



## Props  
  
|                       | required | types                 | default   |description |
| :-------------------: | -------- | :-------------------: | :-------: | ---------- |
| **count**             |          | number                |    1      | Proportionally controls opacity of badge color |
| **color**             |          | string                | '34AFF9'  | Set badge color |
| **maximumValue**      |          | number                |     300   | Set maximum limit where opacity stay 1.0, and if count exceeds maximumValue, badge color opacity sets to 0.6 | 
| **showZero**          |          | boolean               |    true   | Set whether to show '0' count number in badge or not |
| **opacityVisible**    |          | boolean               |    true   | Set application of change in color opacity |
| **variant**           |          | string                |'standard' | Set shape of the badge. Available choices are 'dot' and 'standard' |
| **badgePlacement**          |          | string                |  'right'  | Set position of the badge. Available choices are 'left', 'right' , 'top', 'down'. |
| **border**            |          | string                |           | Set border color of the badge. |
| **textColor**         |          | string                | '#FFFFFF' | Set textColor of the count number inside the badge. |


<br/>
<br/>  

## Installation  
  
```sh
yarn add dooboo-ui
```
<br/>
<br/>


## Getting started  
  
- Import

  ```javascript
  import { Badge } from 'dooboo-ui';
  ```  
<br/>
<br/>


## Usage

```tsx

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ShowContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;

const StyledView: any = styled.View`
  margin: 20px;
  width: 100px;
  height: 100px;
  background-color: #BFBFBF
  border-radius: 12;
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.5);
  elevation: 1;
`;

const Badge1 = (): React.ReactElement => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}>
        <Container>
          <View>
            <StyledTitle>Badge (default)</StyledTitle>
            <StyledView>
              <Badge />
            </StyledView>
          </View>

          <View style={{ marginTop: 20 }}>
            <Container>
              <StyledTitle>Badge (color, count, showZero)</StyledTitle>
            </Container>
            <ShowContainer>
              <StyledView>
                <Badge color="#6B98F2" count={17} />
              </StyledView>
              <StyledView>
                <Badge color="#6B98F2" count={0} showZero />
              </StyledView>
            </ShowContainer>
          </View>

          <View style={{ marginTop: 20 }}>
            <Container>
              <StyledTitle>Badge (variant, position)</StyledTitle>
            </Container>
            <ShowContainer>
              <StyledView>
                <Badge variant="dot" color="#ED2939" />
              </StyledView>
              <StyledView>
                <Badge color="#F2B9AC" count={100} position="left" />
              </StyledView>
            </ShowContainer>
          </View>

          <View style={{ marginTop: 20 }} >
            <Container>
              <StyledTitle>Badge (maximumCount, opacityVisible)</StyledTitle>
            </Container>
            <ShowContainer>
              <StyledView>
                <Badge
                  opacityVisible={false}
                  color="#34AFF9"
                  count={300}
                  maximumCount={100}
                />
              </StyledView>
              <StyledView>
                <Badge
                  opacityVisible={true}
                  color="#34AFF9"
                  count={300}
                  maximumCount={100}
                />
              </StyledView>
            </ShowContainer>
          </View>

          <View style={{ marginTop: 20 }}>
            <Container>
              <StyledTitle>Badge (border, textColor)</StyledTitle>
            </Container>
            <ShowContainer>
              <StyledView>
                <Badge color="#91AAF2" border="#F2B9AC" count={37} />
              </StyledView>
              <StyledView>
                <Badge color="white" border="#F2B9AC" textColor="#F2B9AC" count={50} />
              </StyledView>
            </ShowContainer>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};


```