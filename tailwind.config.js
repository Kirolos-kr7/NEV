module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark1: '#191919',
        dark2: '#212121',
        dark3: '#252525',
        dark4: '#333',
        specialGray: '#A0A0A0',
        slateGray: '#708090',
      },
      backgroundColor: {
        primary: '#eef0f1',
      },
      inset: {
        13: '3.3rem',
      },
      lineHeight: {
        title: '3.4rem',
      },
      minHeight: {
        pic: '350px',
      },
      maxHeight: {
        pic: '350px',
      },
      maxWidth: {
        kratos: '1600px',
      },
      spacing: {
        18: '4.4rem',
      },
      fontFamily: {
        BioRhyme: 'BioRhyme',
        Montserrat: '"Montserrat", Helvetica, sans-serif',
        JetBrains: '"JetBrains Mono", mono',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
