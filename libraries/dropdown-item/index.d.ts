import * as React from 'react';

interface IProps {
	contentVisible?: bool,
	header?: any,
	backgroundColor?: string,
	titleBackground?: string,
	contentBackground?: string,
	underlineColor?: string,
	visibleImage?: any,
	invisibleImage?: any,
}

declare class DropDownItem extends React.Component<IProps, any> {

}

export default DropDownItem;
