import React, { useState } from 'react';
import { useLocationField } from '../..';
import {
	ObjectArrayBoolean,
	ObjectArrayNumber,
	ObjectArrayString
} from '../../types/Initial/Array';
import { ObjectBoolean } from '../../types/Initial/Boolean';
import { ObjectJson } from '../../types/Initial/Json';
import { ObjectNumber } from '../../types/Initial/Number';
import { ObjectString } from '../../types/Initial/String';

function withLocationField(
	name: string,
	value?: ObjectString | string,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: ObjectNumber | number,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: ObjectBoolean | boolean,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: ObjectJson | object,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: ObjectArrayBoolean,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: ObjectArrayNumber,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: ObjectArrayString,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value: any,
	fieldName?: string,
	setFieldName?: string
) {
	return (WrapperComponent: any) => (props: any) => {
		useState();
		const [_value, _setValue] = useLocationField(name, value);

		const _fieldName = fieldName || name;
		const _setFieldName =
			setFieldName || `set${name[0].toUpperCase()}${name.substring(1)}`;

		return (
			<WrapperComponent
				{...props}
				{...{
					[_fieldName]: _value,
					[_setFieldName]: _setValue
				}}
			/>
		);
	};
}
export default withLocationField;
