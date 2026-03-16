import { Box } from '../Box/Box';
import { Separator } from '../Separator/Separator';
import { RadioButtonItem } from './RadioButtonItem';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TItemTConstraints = Record<string, any>;

export type TRadioButtonSelectorProps<itemType extends TItemTConstraints> = {
  items: itemType[];
  selectedItem?: itemType;
  onSelect: (item: itemType) => void;
  labelKey: keyof itemType;
  descriptionKey?: keyof itemType;
  valueKey: keyof itemType;
};

export function RadioButtonSelector<itemType extends TItemTConstraints>({
  items,
  selectedItem,
  onSelect,
  labelKey,
  descriptionKey,
  valueKey,
}: TRadioButtonSelectorProps<itemType>) {
  return (
    <Box>
      {items.map((item, index) => (
        <Box key={item.label}>
          <RadioButtonItem
            label={item[labelKey]}
            description={descriptionKey ? item[descriptionKey] : undefined}
            isSelected={
              !!selectedItem && selectedItem?.[valueKey] === item[valueKey]
            }
            onPress={() => onSelect(item)}
          />
          {index < items.length - 1 && <Separator />}
        </Box>
      ))}
    </Box>
  );
}
