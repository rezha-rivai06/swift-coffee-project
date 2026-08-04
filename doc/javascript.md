# JavaScript Note

## Remote (DOM)

### Document
- `document.title` → Get or change the browser tab title.
- `document.body` → Access the `<body>` element.
- `.append()` / `.appendChild()` → Add text or elements to a target element.

### Element
- `document.createElement()` → Create a new HTML element.
- `.textContent` → Set plain text.
- `.innerText` → Set visible text.
- `.innerHTML` → Set HTML content.

### Selector
- `document.getElementById()` → Select element from HTML by ID.
- `document.getElementsByClassName()` → Select element from HTML by Class.
- `document.getElementsByTagName()` → Select element from HTML by Tag.
- `document.querySelector()` → Select the first element from HTML using CSS selector syntax (e.g., `#id`, `.class`).
- `document.querySelectorAll()` → Select all matching elements from HTML using CSS selector syntax (returns a list/array of elements).
- `Core Concept` → All selector functions get elements from the HTML document, never from CSS. `querySelector` only borrows the CSS writing style to make selecting HTML easier.

### Styling (Inline)
- `.style.property` → Change CSS using JavaScript directly on the element.
- `.style.border` → Set border.
- `.style.padding` → Set padding.
- `.style.backgroundColor` → Set background color.

### Class Manipulation (Dynamic State / "Ghost Class")
- `The CSS Trap (.class1.class2)` → CSS waits for an element to have BOTH classes, but HTML only has `class1`.
- `.classList.add('class2')` → JS injects `class2` into HTML. The CSS awakens!
- `.classList.remove('class2')` → JS removes `class2` from HTML. The CSS sleeps.
- `.classList.toggle('class2')` → JS on/off switch. Adds `class2` if missing, removes if present.

### Events
- `onclick` → Run when clicked.
- `onmouseover` → Run when the mouse enters.
- `onmouseout` → Run when the mouse leaves.

### Script
- `<script src="main.js"></script>` → Connect an external JavaScript file to HTML.

---

## Basic

### Alert, Console & Prompt
- `alert()` → Show a popup message.
- `console.log()` → Display data in the browser console.
- `prompt()` → Show an input popup and return user input.

### Variables
- `Variable` → Store data or values.
- `var` → Old variable declaration (reassignable).
- `let` → Modern variable (reassignable).
- `const` → Constant (cannot be reassigned).

---

## Conditional

### If / Else
- `if` → Run code when a condition is true.
- `else` → Run code when all previous conditions are false.

### Switch
- `switch` → Compare one value with multiple cases.
- `case` → A possible matching value.
- `break` → Stop checking other cases.
- `default` → Run if no case matches.

---

## Operators
- `=` → Assign a value.
- `==` → Compare two values.
- `+`, `-`, `*`, `/` → Basic math operators.
- `` ` ${}` `` → Combine text and variables.

---

## Array
- `[]` → Store multiple values.
- `index` → Item position (starts at 0).
- `.length` → Count items.
- `.push()` → Add the last item.
- `.pop()` → Remove the last item.
- `.shift()` → Remove the first item.

---

## Looping
- `for` → Repeat code a specific number of times.
- `while` → Repeat while the condition is true.
- `do...while` → Run once, then repeat while the condition is true.

---

## Special Object

### Date
- `new Date()` → Create a date and time object.
- `.getDay()` → Get the day of the week (0–6).

---

## Function Basic

### Return Value & Parameter
- `return` → Exit a function and return a value.
- `parameter` → Variable that receives data inside a function.
- `argument` → Value passed when calling a function.
- `arguments` → Built-in object containing all passed arguments.

---

### Konsep Mendalam: Parameter (Logika Substitusi Matematika Universal)

Dalam semua bahasa pemrograman (JavaScript, Python, C++, dll), **Parameter** sebenarnya hanyalah penerapan dari logika **Aljabar Dasar**. Jangan bayangkan parameter sebagai benda, mesin, atau nama gaib. Bayangkan parameter sebagai huruf **`X`** dalam sebuah rumus matematika.

#### 1. Fungsi = Rumus Matematika
Fungsi adalah sebuah rumus matematika yang menunggu untuk dihitung.
Parameter adalah huruf variabel (seperti `X` atau `Y`) di dalam rumus tersebut yang nilainya belum diketahui.

Misal kita punya rumus:
`f(X) = 2 + X`

- Jika `X` tidak diketahui, rumus ini bebas dan bisa menjadi apa saja (sangat dinamis). Nilainya bisa tak terhingga.
- Tapi begitu kita memasukkan angka 10, yaitu `f(10)`, komputer langsung **menghapus semua huruf X** dan **menggantinya (Find & Replace)** dengan angka 10. Rumusnya mendadak berubah wujud menjadi `2 + 10 = 12`.

#### 2. Penerapan Nyata di Dalam Kode
Mari kita ubah rumus matematika `f(X)` menjadi kode pemrograman nyata.

**KODE ASLI (Merakit Rumus)**
```javascript
// Kita membuat rumus bernama 'saringKartuMenu'
// Rumus ini butuh nilai 'X', tapi karena kita sedang koding, kita beri nama 'X' itu 'kategoriYangDipilih'
function saringKartuMenu( kategoriYangDipilih ) {
    
    // Selama di dalam rumus, kita belum tahu apa isi 'kategoriYangDipilih'.
    // Jadi biarkan saja dia menjadi variabel 'X'.
    if (kategoriKartu === kategoriYangDipilih) {
        kartu.style.display = "block";
    }

}
```

#### 3. Keajaiban Trik Substitusi (Find & Replace)
Lalu, bagaimana saat rumus itu digunakan? 
Saat di baris lain kita memanggil fungsi tersebut, misalnya:
`saringKartuMenu("coffee");`

Dalam 1 milidetik, komputer akan melakukan **Trik Substitusi (Find & Replace)**. Semua huruf `X` (`kategoriYangDipilih`) di dalam rumus tersebut akan dihapus secara paksa dan langsung ditimpa oleh tulisan `"coffee"`.

**BAGAIMANA KOMPUTER MEMBACA KODEMU SAAT DIPANGGIL:**
```javascript
function saringKartuMenu( "coffee" ) {
    
    // Tulisan 'kategoriYangDipilih' MENGHILANG, digantikan seketika oleh nilai aslinya!
    if (kategoriKartu === "coffee") {
        kartu.style.display = "block";
    }

}
```

#### 4. Kenapa Harus Menggunakan Rumus (Parameter)?
Bayangkan jika kamu tidak memakai rumus `f(X)`.
Kalau kamu mau menjumlahkan angka 10, kamu harus nulis `2 + 10`.
Kalau kamu mau menjumlahkan angka 1000, kamu harus nulis lagi dari nol `2 + 1000`.

Dengan parameter `f(X) = 2 + X`, kamu cukup membuat **satu rumus saja**.
Mau dipanggil `f(10)` bisa, mau dipanggil `f(1000)` juga bisa. Rumus yang sama akan menyelesaikan ribuan masalah berbeda. Inilah alasan utama kenapa Parameter diciptakan di seluruh bahasa pemrograman di dunia.

#### 5. Cara Membaca Kode Programmer Lain
Jika kamu melihat kode orang lain yang sangat rumit dan memiliki parameter yang aneh-aneh, gunakan kacamata matematika ini:
1. Anggap parameter itu adalah `X` (huruf kosong yang belum ada nilainya).
2. Cari di mana fungsi itu dipanggil (contoh: dipanggil dengan nilai `"Budi"`).
3. Di dalam otakmu, hapus nama parameter itu dan ganti langsung dengan tulisan `"Budi"`. Kodenya akan mendadak masuk akal dan mudah dibaca!

---

### Function Types
- `Standard Function` → Function declared with the `function` keyword.
- `Expression Function` → Anonymous function stored in a variable.
- `New Function` → Function created using the `Function()` constructor.
- `Arrow Function (=>)` → Modern and concise function syntax.

---

### Hoisting
- `Hoisting` → Functions and `var` declarations are moved to the top during execution.
- `Standard Function` → Can be called before its declaration.
- `let` / `const` Function → Cannot be called before declaration (**Before initialization** error).

---

### Function Logic
- `Math` → Perform calculations.
- `if...else` → Execute code based on conditions.
- `for` → Repeat code.
- `Math.random()` → Generate a random number.