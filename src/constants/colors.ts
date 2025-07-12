const light = {
  active: '#F08809',
  secondary: '#EAEAEA',
  tertiary: '#888',
  bottomTabBackground: '#FBFBFB',
  background: '#FBFBFB',
  text: {
    primary: '#000',
    secondary: '#fff',
    ghost: '#CECECE',
  },
}

const dark = {
  active: '#F08809',
  secondary: '#777',
  tertiary: '#5D5D5D',
  bottomTabBackground: '#1C1C1C',
  background: '#2D2D2D',
  text: {
    primary: '#fff',
    secondary: '#000',
    ghost: '#CECECE',
  },
}

export const colors = (isDarkMode: boolean) => {
  return isDarkMode ? dark : light
}
