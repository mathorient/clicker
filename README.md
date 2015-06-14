Calculator Clicker
==================
This is a clone of the popular [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/) game with a Math-oriented theme.
In `Calculator Clicker`, you're tasked with mining calculators as opposed to cookies.

# Application
The main application is in `app.js` with the item specifications in `items.js`.  The application is a `Marionette` application.
You can find information about how a Marionette application works by looking over their documentation here:
https://github.com/marionettejs/backbone.marionette/tree/master/docs

## Design Guidelines
* Propogate events up to the main application and process them there.
* Keep `View` and `Model` code separate by using the appropriate objects.
* Use templates whenever possible.
* Avoid exposing application level code to the global namespace; this prevents users from mucking with it.

# Item Specification
| Field          | Items                        | Description                                        |
| -------------- | ---------------------------- | -------------------------------------------------- |
| name           | Store, Achievements, Upgrade | Name of the item.                                  |
| description    | Store, Achievements, Upgrade | Description of the item.                           |
| value          | Store                        | Value added by buying the item.                    |
| cost           | Store, Upgrade               | Cost of the item.                                  |
| type           | Store                        | Calcs-per-second (cps) or Calc-per-click (cpc).    |
| modifierRate   | Upgrade                      | Rate at which item modifiers cps/cpc.              |
| modifierTarget | Upgrade                      | The target item that the upgrade affects.          |
| modifierType   | Upgrade                      | The type of upgrade ('percent' or 'flat').         |
| condition      | Achievement                  | Function returning boolean indicating if achieved. |
