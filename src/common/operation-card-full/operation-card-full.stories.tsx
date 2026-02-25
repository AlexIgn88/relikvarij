import type { Meta, StoryObj } from '@storybook/react';
import OperationCardFull from './operation-card-full';

const meta: Meta<typeof OperationCardFull> = {
  title: 'Components/OperationCardFull',
  component: OperationCardFull,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const description =
  'On October 10, 2025, a payment of $78.45 was successfully processed using your Visa debit card (ending in 4721).\n' +
  'The transaction was made at "Starbucks Coffee #2145", located in New York, NY.\n' +
  'The payment was categorized under “Food & Beverages” and deducted from your checking account.\n' +
  'The remaining balance after this transaction is $1,247.32.';

// export const OperationCardFullStory: Story = {
//   args: {
//     amount: 1546,
//     category: { name: 'Profit' },
//     name: 'Profit for the day',
//     date: '01/01/1999',
//     description: description,
//   },
// };
