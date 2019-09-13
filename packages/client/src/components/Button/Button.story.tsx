import * as React from 'react';
import * as chroma from 'chroma-js';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Button, DarkButton, PushButton, ButtonGroup } from './Button.styled';

const stories = storiesOf('Atoms/Buttons', module);
stories.addDecorator(withKnobs);

stories.add('Default Button', () => {
  const label = text('Label', 'Push me!');
  return <Button>{label}</Button>;
});

stories.add('CTA Button', () => {
  const label = text('Label', 'Push me!');
  const color = chroma.mix(chroma.lch(55, 35, 245), 'black', .1);
  return <DarkButton _color={color}>{label}</DarkButton>;
});

stories.add('Button Group', () => {
  return (
    <ButtonGroup>
      <PushButton>First</PushButton>
      <PushButton pressed>Second</PushButton>
      <PushButton>Third</PushButton>
    </ButtonGroup>
  );
});