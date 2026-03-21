# 🔐 Password Generator

A modern password generator with dynamic UI, customizable themes, and real-time strength analysis.  
Built with vanilla JavaScript, focusing on clean logic, DOM manipulation, and user experience without frameworks.

---

##  Highlights

- Dynamic themes (Netflix, Spotify, Discord-inspired) with `localStorage` persistence  
- Custom password generation (uppercase, lowercase, numbers, symbols)  
- Real-time strength evaluation with visual feedback  
- Interactive UI with instant updates and smooth UX  
- Clipboard API integration for one-click copy  

###  Weak pattern detection (Regex)

- Sequences (`123`, `abc`)  
- Repetitions (`aaa`, `111`)  
- Repeated patterns (`abab`, `1212`)  
- Common passwords (`password`, `admin`)  

---

##  Strength Logic

Password strength is calculated based on:

- Length  
- Character variety  
- Heuristic penalties using Regex  

### Example

```js
/^\d+$/           // only numbers
/(.)\1{2,}/       // repeated characters
/^(.{1,3})\1+$/   // repeated patterns
```
 ![Author](https://img.shields.io/badge/author-vxtinzzz-black)
