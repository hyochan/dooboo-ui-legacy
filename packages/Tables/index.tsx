import * as React from 'react';

import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import CheckBox from './CheckBox';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableTitle from './TableTitle';
import styled from 'styled-components/native';

export interface Props {
  style?: StyleProp<ViewStyle>;
  data: Array<Record<string, any>>;
  isCheckAble?: boolean;
  customGroup?: Array<string>;
}

type TableNamespace = {
  Title: typeof TableTitle;
  Header: typeof TableHeader;
  Row: typeof TableRow;
  Cell: typeof TableCell;
};

const Container = styled.View`
  flex: 1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Table: React.FC<Props> & TableNamespace = ({
  data,
  isCheckAble,
  customGroup,
  style,
  ...rest
}) => {
  /** default Data key */
  const group = data.reduce((acc, current) => {
    Array.from(Object.assign(acc, Object.keys(current)));
    return acc;
  }, []);

  /** checking interaction */
  const [selected, setSelected] = React.useState<string[]>([]);
  const isSelected = (name: string): boolean => selected.indexOf(name) !== -1;
  const handleClick = (name: string): void => {
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
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
      }}>
      <ScrollView horizontal>
        <Container {...rest} style={[style]}>
          <View>
            <Text>
              {selected.length > 0 ? `${selected.length} item selected` : null}{' '}
            </Text>
          </View>
          <Table.Header style={{ backgroundColor: '#f9f9f9' }}>
            <Table.Title style={[!isCheckAble && styles.short]} />

            {/** have a customGroup or undefined  */}
            {(customGroup || group)?.map((field: any, index: number) => {
              return (
                <Table.Title
                  numberOfLines={1}
                  key={`${field}-${index}`}
                  style={[styles.center, index === 0 ? styles.short : null]}>
                  {field}
                </Table.Title>
              );
            })}
          </Table.Header>
          {data.map((item, i) => {
            const isItemSelected = isSelected(item[group[0]]);
            return (
              <Table.Row
                key={`row-${item}-${i}`}
                isChecked={!!isItemSelected}
                style={[styles.default, isItemSelected && styles.isChecked]}>
                {/* If CheckAble is true */}
                {isCheckAble ? (
                  <Table.Cell style={[{ justifyContent: 'center' }]}>
                    <CheckBox
                      onClick={(): void => handleClick(item[group[0]])}
                      checked={!!isItemSelected}
                    />
                  </Table.Cell>
                ) : (
                  <Table.Cell style={[!isCheckAble && styles.short]} />
                )}
                {/** Body */}
                {group?.map((param: any, index: number) => {
                  return (
                    <Table.Cell
                      key={`cell-${param}-${index}`}
                      style={[
                        styles.center,
                        index === 0 ? styles.short : null,
                      ]}>
                      {item[param]}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Container>
      </ScrollView>
    </ScrollView>
  );
};

Table.Title = TableTitle;
Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;

const styles = StyleSheet.create({
  short: {
    width: 50,
  },
  center: {
    justifyContent: 'center',
  },
  default: {
    backgroundColor: 'white',
  },
  isChecked: {
    backgroundColor: '#f2f9ff',
  },
});

export default Table;
