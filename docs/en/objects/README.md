## Package support next objects:

-   [String](/docs/en/objects/String 'String')
-   [Number](/docs/en/objects/Number 'Number')
-   [Boolean](/docs/en/objects/Boolean 'Boolean')
-   [Json](/docs/en/objects/Json 'Json')
-   [Array](/docs/en/objects/Array 'Array')
    -   String
    -   Number
    -   Boolean

Objects need to pass rules for package, to manipulate with fields.

You also can pass just `string`, `number`, `boolean` or `array` of prev values and package automaticly convert it to object.

### Example

```javascript
const [name, setName] = useLocationField('name', 'Rostyslav');
```

package will convert object as you pass it:

```javascript
const [name, setName] = useLocationField('name', {
    type: 'string',
    initial: 'Rostyslav'
    ...defaultOptions
});
```

**ATTENTION**: defaultOptions is options from [BrowserLocationQuery](/docs/en/components/BrowserLocationQuery.md 'BrowserLocationQuery') and it have [default values](/docs/en/options/DefaultOptions.md 'default values').
