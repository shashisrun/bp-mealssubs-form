/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
        {
        mytheme: {
        
          "primary": "#329832",
                
          "secondary": "#00e075",
                
          "accent": "#eef8f0",
            
          "neutral": "#111115",
                    
          "base-100": "#FFFFFF",
                    
          "info": "#CAE2E8",
                    
          "success": "#DFF2A1",
                    
          "warning": "#F7E488",
                    
          "error": "#F2B6B5",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes

          "--rounded-btn": "999rem", // border radius rounded-btn utility class, used in buttons and similar element
          
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          
          "--animation-btn": "0.25s", // duration of animation when you click on button
          
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          
          "--btn-text-case": "uppercase", // set default text transform for buttons
          
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          
          "--border-btn": "1px", // border width of buttons
          
          "--tab-border": "1px", // border width of tabs
          
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
