# CSS Note - English Version

## Remote

- `img` = remote tag
- `.image` = remote class
- `#image` = remote id
- `<link rel="stylesheet" type="text/css" href="style.css">`

---

## Basics & Text

- `font-family`: Sets the font type (font name, sans-serif, monospace).
- `font-style`: Changes font style (normal, italic).
- `font-weight`: Sets font thickness (normal, bold, lighter).
- `text-decoration`: Adds lines to text (none, underline, wavy, dotted).
- `font-size`: Sets text size (px).
- `color`: Sets font color (color name, rgb, hex).

---

## Border

- `border-style`: Sets border line type (solid, dashed, dotted, double, ridge, groove, inset, outset).
- `border-width`: Sets border thickness (px).
- `border-color`: Sets border color (color name, hex).
- `border-radius`: Makes element corners rounded (px).
- `padding`: Sets space inside the border (px).

---

## Background

- `background-color`: Sets background color (color name, rgb, hex).
- `background`: Creates gradients (linear-gradient(direction, color1, color2)).
- `background-repeat`: Sets image repetition (no-repeat).
- `background-attachment`: Sets image movement when scrolling (fixed).
- `background-image`: Displays image (url('filename.jpg')).
- `background-position`: Sets image position (center).
- `background-size`: Sets image scale (cover).

---

## Box Model

- `margin`: Sets space outside the border (px, %, auto).
- `overflow`: Controls what happens to content that breaks outside of its bounds (hidden, auto, scroll).

---

## Layout & Position

- `float`: Positions element to the side so text can flow (left, right).
- `clear`: Cancels float effect (left, right, both).
- `position`: Sets element positioning method (static, relative, absolute, fixed, sticky).
- `top/bottom/left/right`: Sets offset distance for element coordinates (px).
- `position: static`: Default position. Elements follow the normal document flow.
- `position: relative`: Positioned relative to its normal static position. Acts as a "container" for absolute children.
- `position: absolute`: Removed from normal document flow. Positioned relative to its closest positioned ancestor (like a relative parent).

---

## Interaction & Selectors

- `:hover`: Properties when cursor is over element.
- `:active`: Properties when element is clicked.
- `:visited`: Properties for links that have been opened.
- `:nth-child()`: Selects element by order (number, odd, even, formula 3n+1).
- `::before`: Creates a virtual element (pseudo-element) as the first child of the selected element. Requires `content` property.
- `::after`: Creates a virtual element (pseudo-element) as the last child of the selected element. Requires `content` property.

---

## Shadow & Icons

- `text-shadow`: Text shadow (x-offset, y-offset, blur, color).
- `box-shadow`: Box shadow (x-offset, y-offset, blur, spread, color).

---

## Transform

- `transform`: Changes object shape (translate(), rotate(), scale(), skew(), matrix()).

---

## Animation

- `@keyframes`: Defines animation frames (from/0% to 100%).
- `animation-name`: Sets animation name.
- `animation-duration`: Animation duration (s).
- `animation-iteration-count`: Number of repetitions (number, infinite).
- `animation-timing-function`: Transition speed (linear, ease, ease-in, ease-out).
- `animation-play-state`: Animation state (running, paused).

---

## Layout Quick Notes

- `margin` = sets distance outside
- `padding` = sets distance inside
- `display: flex` = makes items horizontal
- `gap` = sets distance between objects
- `justify-content: space-between;` = creates distance between items

---

# Flexbox

## Main Container (Parent Container)

- `display: flex;` : Activates Flexbox system on wrapper element.
- `flex-direction` : Sets main axis direction.  
  Values: `row` (horizontal, default), `column` (vertical), `row-reverse`, `column-reverse`.
- `gap`: Sets space between elements instantly without margin.  
  Values: Pixel number (e.g: `20px`).  
  Variants: `row-gap` and `column-gap` for specific spacing.

---

## Alignment

- `justify-content`: Sets element position along main axis.  
  Values: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`.
- `align-items`: Sets element position along cross axis.  
  Values: `flex-start` (top), `flex-end` (bottom), `center` (middle), `stretch` (default/full height).
- `align-content`: Sets row distribution when elements wrap (flex-wrap).  
  Values: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`.

---

## Responsiveness

- `flex-wrap`: Sets whether elements wrap to new line when screen is full.  
  Values: `nowrap` (force single line), `wrap` (wrap down), `wrap-reverse`.

---

## Flex Item Sizing

- `flex-grow`: Sets ability of element to grow and fill empty space.  
  Values: Number (e.g: `1` to grow, `0` to not grow).
- `flex-shrink`: Sets ability of element to shrink when space is not enough.  
  Values: Number (default `1`). If `0`, element will not shrink.
- `align-self`: Sets position of one specific element inside container, overrides parent `align-items`.  
  Values: `flex-start`, `flex-end`, `center`, `baseline`, `stretch`.

---

# CSS Grid

## Grid Basics (Container & Item)

- `display`: Activates grid on parent element (grid, inline-grid).
- `grid-template-columns`: Sets number and width of grid columns (px, fr, em).
- `grid-template-rows`: Sets height of grid rows (px, fr, em).
- `gap`: Adds space between columns and rows (px, em, rem).

---

## Responsiveness & Flexibility

- `Fraction (fr)`: Flexible unit that divides remaining space proportionally (1fr, 2fr).
- `repeat()`: Function to repeat column/row size writing (repeat(count, size)).
- `auto-fit`: Automatically fills grid based on available space.
- `minmax()`: Sets minimum and maximum size limit for cells (minmax(min, max)).

---

## Alignment

- `justify-items`: Horizontal alignment of content inside cells (start, end, center).
- `align-items`: Vertical alignment of content inside cells (start, end, center).
- `justify-content`: Horizontal alignment of entire grid inside container (start, end, center).
- `align-content`: Vertical alignment of entire grid inside container (start, end, center).
- `place-items`: Shorthand for justify-items and align-items (center).

---

## Implicit Grid & Advanced Layout

- `grid-auto-rows`: Size of automatically created rows by browser (px, auto, fr).
- `grid-auto-columns`: Size of automatically created columns (px, auto, fr).
- `grid-auto-flow`: Sets flow direction for new elements (row, column).
- `grid-area`: Names an item for easy positioning (unique name).
- `grid-template-areas`: Defines layout using area names (string of area names).

---

## Stacking & Placement

- `grid-column`: Sets element column span (start/end).
- `grid-row`: Sets element row span (start/end).
- `z-index`: Sets element stacking order (integer).