import { Box } from '../Box/Box';
import { Separator } from '../Separator/Separator';
import { RadioButtonItem, TRadioButtonItemProps } from './RadioButtonItem';

export type TRadioButtonSelectorProps = {
  items: TRadioButtonItemProps[];
};

export function RadioButtonSelector({ items }: TRadioButtonSelectorProps) {
  return (
    <Box>
      {items.map((item, index) => (
        <Box key={item.label}>
          <RadioButtonItem {...item} />
          {index < items.length - 1 && <Separator />}
        </Box>
      ))}
    </Box>
  );
}
