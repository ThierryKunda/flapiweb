import { defineConfig } from "@pandacss/dev"

export default defineConfig({
    // Whether to use css reset
    preflight: true,
    
    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
      extend: {},
      tokens: {
        colors: {
          primary: {
            user: {value: "#5CD8F3"},
            admin: {value: "#5C99F3"},
          }
        },
        sizes: {
          tableSize: {
            normal: {value: "600px"},
            large: {value: "800px"},
            fullWidth: {value: "100%"},
          }
        }
      }
    },

    // The output directory for your css system
    outdir: "styled-system",
    
    
})