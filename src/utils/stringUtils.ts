function formatFirstLetter(str: string) {
  return str
    .split(' ')
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase(),
    )
    .join(' ')
    .trim();
}

export const stringUtils = { formatFirstLetter };
