/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xxs': '280px',
      'xs': '380px',
      'sm' : '640px',
      'md' : '768px',
      'lg' : '1024px',
      'xl' : '1280px',
    },
    extend: {
      fontFamily: {
        roboto: ['roboto-normal'], 
        robotoBold: ['roboto-bold'], 
        robotoExtraBold: ['roboto-extrabold'],
        radjdhani_semibold : ['radjdhani_semibold'],
        radjdhani_medium:['radjdhani_medium'],
        radjdhani_bold:['radjdhani_bold'],
        radjdhani_regular:['radjdhani_regular'],
        radjdhani_light:['radjdhani_light'],
        cartoon:['cartoon'],
        montserrat_regular: ['Montserrat-Regular'],
        montserrat_medium: ['Montserrat-Medium'],
        montserrat_semibold: ['Montserrat-SemiBold'],
        montserrat_bold: ['Montserrat-Bold'],
        montserrat_extrabold: ['Montserrat-ExtraBold'],
        netflixsansbold: ['NetflixSansBold']
      },
      colors : {
        primary : "#074173",
        secondary : '#1679AB',
        tosca : "#088395",
        green : "#37B7C3",
        netral : '#EBF4F6',
        wa: '#00e64d'
      },
      boxShadow: {
        'custom-light': '0 2px 6px -1px #074173, 0 2px 4px -1px rgba(255, 77, 255, 0.3)',
      },
      dropShadow: {
        'custom-light': '0 1px 2px #074173',
        'black': '0px 0px 1px #F26B0F',
      },
    },
  },
  important: true,
  plugins: [],
};
