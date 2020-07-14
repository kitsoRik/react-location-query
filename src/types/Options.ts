export interface Options {
	sortingOptions: {
		sortBy: 'index' | 'alphabet' | 'fieldLength';
		sortOrder: 'asc' | 'desc';
	};
	defaultOptions: {
		hideIfDefault: boolean;
		replaceValueWhenParsedError: boolean;
	};

	removeUnusedQueryFields: boolean;
}
