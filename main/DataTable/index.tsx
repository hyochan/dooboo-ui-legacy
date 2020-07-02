import * as React from 'react';
import { StyleSheet, StyleProp, View, ViewStyle, ScrollView, Text } from 'react-native';
import DataTableCell from './DataTableCell';
import DataTableHeader from './DataTableHeader';
import DataTableTitle from './DataTableTitle';
import DataTableRow from './DataTableRow';
import styled from 'styled-components/native';
import { keyframes } from 'styled-components';
import CheckBox from './CheckBox';
import isHasValue from './utils';

export interface Props {
  style?: StyleProp<ViewStyle>;
  data: Array<Record<string, any>>;
  isCheckAble?: boolean;
  customGroup?: Array<string>;
}
type DataTableNamespace = {
  Title: typeof DataTableTitle;
  Header: typeof DataTableHeader;
  Row: typeof DataTableRow;
  Cell: typeof DataTableCell;
};
const Container = styled.View`
  flex:1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const DataTable: React.FC<Props> & DataTableNamespace = ({ data, isCheckAble, customGroup, children, style, ...rest }) => {

  /** default Data key */
  const group = data.reduce(
    (acc, current) => {
      Array.from(Object.assign(acc, Object.keys(current)));
      return acc;
    },
    [],
  );

  /** checking interaction */
  const [selected, setSelected] = React.useState<string[]>([]);
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  /** Render */
  return (
    <ScrollView style={{
      width: '100%',
      height: '100%',
    }}>
      <ScrollView horizontal>
        <Container {...rest} style={[style]}>
          <View>
            <Text>{selected.length > 0 ? `${selected.length} item selected` : null} </Text>
          </View>
          <DataTable.Header style={{ backgroundColor: '#f9f9f9' }}>
            <DataTable.Title style={[!isCheckAble && styles.short]} />

            {/** have a customGroup or undefined  */}
            {(customGroup ? customGroup : group)?.map((field: any, index: number) => {
              return (
                <DataTable.Title
                  numberOfLines={1}
                  key={`${field}-${index}`}
                  style={[styles.center, index === 0 ? styles.short : null]}
                >
                  {field}
                </DataTable.Title>
              )
            })}
          </DataTable.Header>
          {data.map((item, i) => {
            const isItemSelected = isSelected(item[group[0]]);
            return (
              <DataTable.Row
                key={`row-${item}-${i}`}
                isChecked={!!isItemSelected}
                style={{ backgroundColor: 'white' }}
              >
                {/* If CheckAble is true */}
                {isCheckAble ? (
                  <DataTable.Cell style={[{ justifyContent: 'center' }]}>
                    <CheckBox onClick={() => handleClick(item[group[0]])} checked={!!isItemSelected} />
                  </DataTable.Cell>
                )
                  : <DataTable.Cell style={[!isCheckAble && styles.short]} />
                }
                {/** Body */}
                {group?.map((param: any, index: number) => {
                  return (
                    <DataTable.Cell
                      key={`cell-${param}-${index}`}
                      style={[styles.center,
                      index === 0 ? styles.short : null]}
                    >
                      {isHasValue(item[param])}
                    </DataTable.Cell>
                  )
                })}
              </DataTable.Row>
            )
          })}
        </Container >
      </ScrollView>
    </ScrollView >
  );
}

DataTable.Title = DataTableTitle;
DataTable.Header = DataTableHeader;
DataTable.Row = DataTableRow;
DataTable.Cell = DataTableCell;

const styles = StyleSheet.create({
  short: {
    width: 50,
  },
  center: {
    justifyContent: 'center'
  },

});

export default DataTable;
