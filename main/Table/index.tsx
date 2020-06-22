import React from 'react';
import styled from 'styled-components/native';

const TableView = styled.View`
  flex: 1;
  flex-direction: column;
  margin-top: 150px;
`;

const TableHeader = styled.View`
  display: flex;
  flex-direction: row;
  background-color: lightgray;
`;

const TableBody = styled.View`
  display: flex;
  height: 300px;
  flex-direction: column;
  overflow-y: scroll;
`;

const TableRow = styled.View`
  display: flex;
  flex-direction: row;
  background-color: white;
`;

const CellHeader = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 20px;
  border-width: 1px;
  border-color: 'black';
`;

const Cell = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 20px;
  border-width: 1px;
  border-color: 'black';
`;

type Data = {
  Name: string,
  Address: string,
  Profession: string,
  Phone: string,
}

interface Props {
  data: Array<Data>;
}

const Table = (props: Props): React.ReactElement => {
  const { data } = props;

  return (
    <TableView>
      <TableHeader>
        <CellHeader> Name </CellHeader>
        <CellHeader> Address </CellHeader>
        <CellHeader> Profession </CellHeader>
        <CellHeader> Phone </CellHeader>
      </TableHeader>
      <TableBody>
        {data.map((content, idx) => {
          return (
            <TableRow key={idx}>
              <Cell>{content.Name}</Cell>
              <Cell>{content.Address}</Cell>
              <Cell>{content.Profession}</Cell>
              <Cell>{content.Phone}</Cell>
            </TableRow>
          );
        })}
      </TableBody>
    </TableView>
  );
};

export default Table;
