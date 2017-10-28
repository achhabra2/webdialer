import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Timeline from '../src/components/Timeline';
import SparkLogo from '../src/spark/react-component-spark-logo';
import SparkSpinner from '../src/spark/react-component-spinner';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Timeline', module).add('default', () => <Timeline />);

storiesOf('React Spark', module).add('default', () => <SparkSpinner />);
