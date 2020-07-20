# Revolution Carousel

**Version 1.0.0**

A reusable carousel component written in vanilla js.

Coding assessment for the team at Revolution Parts.

---

## Demo

Demonstrates how the user can select options and use custom events to animate things like an information card and the built-in coupon.

### Run a local server.
**Ex:** Install npm > install http-server > run "./ http-server" in project directory

**Ex:** Install php > run "php -S localhost:8080" in project directory

---

## Usage

1. Create carousel div with class name of choice
2. Create ".slider" div inside carousel. ( Any children are treated as slides )
3. Add slides with desired content.
4. In script, initiate slider with preferred options.

---

## Options

User can initialize carousel with varoius options.

- **Nav** (bool) - Optionally hide the navigation on top the slider
- **AutoPlay** (bool) - Tell slider to loop automatically
- **Coupon** (obj)
  - Initiates the built-in coupon component.
  - Set your discount (int)
  - Set your message (str)

---

## Events

The carousel emits custom events that can be utilized to customize the slider

- **carouselInit** - Fires when slider is initialized on first load
- **beforeSlideChange** - Fires before slide changes 
- **afterSlideChange** - Fires after slide changes

---

## Future Updates

1. Finish nav abstraction and generate nav items based on nav option and user-added html attributes for nav item titles
2. Abstract arrows from html and generate in script
3. Abstract card into separate component that can be swapped out or customized
4. Idea for allowing users to add custom html attribute that would track what section of the card was clicked ( I.e. info or coupon )

## Copyright

&copy; Kevin Grant
