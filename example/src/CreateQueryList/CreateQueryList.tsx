import React, { useEffect, useState } from 'react';
import { inject, observer, Observer } from 'mobx-react';
import { QueryItems } from '../mobx/models/QueryItems';
import { List } from 'antd';
import CreateQueryListItem from './CreateQueryListItem';
import {
	useLocationQuery,
	useLocationQueryExtend,
	setOptions
} from 'react-location-query';
setOptions({
	sortingOptions: {
		sortBy: 'alphabet',
		sortOrder: 'asc'
	}
});
interface Props {
	queryItems?: QueryItems;
}

const CreateQueryList = ({ queryItems }: Props) => {
	const [defaultValues, setDefaultValues] = useState({});
	const {} = useLocationQuery(defaultValues);

	const { query, fullQuery, setQueryField } = useLocationQueryExtend({
		// @ts-ignore
		bool: false,
		age: {
			type: 'number',
			initial: 19,
			//@ts-ignore
			onParsedError: (value: string) => {
				console.log(value);
				return 228;
			}
		},
		name2: {
			type: 'json',
			initial: {
				// @ts-ignore
				name2: 'ss3'
			}
		}
	});
	console.log(fullQuery);
	useEffect(() => {
		setQueryField('name2', {
			//@ts-ignore
			hello: 44
		});
		const newDefaultValues: any = {};

		queryItems!.items.forEach((item) => {
			newDefaultValues[item.name] = {
				type: item.type,
				initial: item.initial,
				hideIfInitial: item.hideIfInitial
			};
		});
		setDefaultValues(newDefaultValues);
	}, [JSON.stringify(queryItems!.items)]);
	return (
		<List
			dataSource={queryItems!.items}
			renderItem={(item) => <CreateQueryListItem item={item} />}
		/>
	);
};

export default inject('queryItems')(observer(CreateQueryList));
