# Uniform Design System (UDS)

UDS is a living, breathing product. Designed to convey Open College's visual language and promote product consistency across a wide range of contexts and technologies.

UDS' aim is to deliver reusable components and front-end patterns that ensure efficient implementation and a unified user experience. Improving build times and reducing user's cognitive load by minimising product inconsistencies.

## Live demo

To view a live demo of UDS, check out the [Uniform Staging Environment](http://54.206.26.4 'Uniform Staging Environment').

## License

Uniform Design System is released under the MIT License.

Copyright © 2018–2019 Open Colleges Pty Ltd

Copyright © 2018–2019 The Uniform Authors

## Installation

Install UDS using [npm](https://www.npmjs.com 'npm').

```bash
npm install oc-uniform --save
```

## Usage

```jsx
// UDS components
import { Heading, Copy } from 'oc-uniform';

// UDS styles
import 'oc-uniform/dist/heading.css';
import 'oc-uniform/dist/copy.css';

// Your component
const Header = () => {
  return (
    <header role="banner">
      <Heading>Hello world!</Heading>
      <Copy>I'm an Open Colleges product...</Copy>
    </header>
  );
};
```

### Output

```html
<header role="banner">
  <h1 class="oc-h1">Hello world!</h1>
  <p class="oc-p">I'm an Open Colleges product...</p>
</header>
```

## Extended documentation

Check out the [Uniform Wiki](https://github.com/opencolleges/Uniform/wiki 'Uniform Wiki') for more examples and in-depth documentation.
