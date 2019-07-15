import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Button from './index'

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Here</Button>)
  .add('with emoji', () => <Button onClick={action('clicked')}>👉🏻</Button>)
