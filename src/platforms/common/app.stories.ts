
import { App } from './app';
//import { action } from '@storybook/addon-actions';
//import { userEvent, within } from '@storybook/test';

const meta = {
  title: 'Example/App',
  component: App,
  render: () => ({
    template: `<app message.bind="message"></app>`,
  }),
  argTypes: {
    message: { control: 'text' }
  }
};

export default meta;

export const Default = {
  args: {
    message: 'Hello from Storybook!'
  }
};

export const CustomMessage = {
  args: {
    message: 'This is a custom message for testing'
  }
};

export const WelcomeMessage = {
  args: {
    message: 'Welcome to your Aurelia 2 + Storybook setup!'
  }
};

export const NoArgs = {
  render: () => ({
    template: `<app></app>`
  })
};

 