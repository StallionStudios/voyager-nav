# Voyager Nav

Voyager Navigation is a utility that observes elements and highlights the corresponding navigation links as they intersect with the viewport—ideal for one-page websites.

## Installation

```bash
npm install voyager-nav
```

## Usage

To use Voyager Nav, import it and initialize it after the DOM content has loaded.

```javascript
import Voyager from 'voyagerNav';

  const nav = new Voyager({
    selector: '[data-voyager]',    // Selector for target elements
    activeClass: 'active',         // Class to add for active links
    rootMarginTop: '-50px',        // Top margin for the observer root
    rootMarginBottom: '-50px',     // Bottom margin for the observer root
    threshold: 0.5                 // Intersection threshold
  });

```

## Configuration

Below are the configuration options you can use when initializing Voyager.

| Option           | Type   | Default            | Description                                            |
| ---------------- | ------ | ------------------ | ------------------------------------------------------ |
| selector         | string | `[data-voyager]` | CSS selector for the elements to observe               |
| activeClass      | string | `'active'`       | Class to add when a link's target is being intersected |
| rootMarginTop    | string | `0px`            | Top margin for the intersection observer's root        |
| rootMarginBottom | string | `0px`            | Bottom margin for the intersection observer's root     |
| threshold        | number | `0.1`            | Threshold for intersection observer activation         |

## Methods

Voyager provides two main methods for managing the observer:

* `refresh()`: Re-initialize the observer to observe any new or modified elements.
* `destroy()`: Disconnect the observer and clean up resources.

## License

Voyager Nav is licensed under the MIT License.
