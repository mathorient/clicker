/*global Marionette, Backbone */
function deepcopy(obj) {
  if (!obj) {
    return obj;
  }
  var d = null;
  if (typeof obj === 'object') {
    if (obj.constructor === 'Array') {
      d = [];
      obj.forEach(function(o) {
        d.push(deepcopy(o));
      });
      return d;
    } else {
      d = {};
      Object.keys(obj).forEach(function(k) {
        d[k] = deepcopy(k);
      });
      return d;
    }
  }
  return obj;
}

var Achievement = Backbone.Modal.extend({
  initialize: function(attributes, options) {
    if (typeof attributes.name !== 'string' || typeof attributes.description !== 'string') {
      throw TypeError('Expected a name and description for Achievement.');
    } else if (typeof attributes.condition !== 'function') {
      throw TypeError('Expected to be passed a condition function.');
    }
    this.name = attributes.name;
    this.description = attributes.description;
    this.condition = attributes.condition;
    this.achieved = false;
    this.itemType = 'achievement';
  },
  checkAchieved: function(data) {
    if (this.condition(deepcopy(data))) {
      this.achieved = true;
      return true;
    }
    return false;
  }
});

var StoreItem = Backbone.Model.extend({
  initialize: function(attributes, options) {
    if (typeof attributes.name !== 'string' || typeof attributes.description !== 'string') {
      throw TypeError('Expected a name and description for Item.');
    }
    this.name = attributes.name;
    this.description = attributes.description;
    this.count = 0;
    this.available = false;
    this.cost = attributes.cost;
    this.value = attributes.value;
    // One of either 'click' or 'cps'.
    this.type = attributes.type;
    this.itemType = 'store';
  }
});

var Upgrade = Backbone.Model.extend({
  initialize: function(attributes, options) {
    if (typeof attributes.name !== 'string' || typeof attributes.description !== 'string') {
      throw TypeError('Expected a name and description for Upgrade.');
    } else if (typeof attributes.modifierTarget !== 'string') {
      throw TypeError('Expected a modifier target.');
    }
    this.name = attributes.name;
    this.description = attributes.description;
    this.purchased = false;
    this.available = false;
    this.cost = attributes.cost;
    this.modifierTarget = attributes.modifierTarget;
    // A float that represents either a flat amount for which to increase or
    // the percantage for which to modify.
    this.modifierRate = attributes.modifierRate;
    // One of either 'percent' or 'flat'.
    this.modifierType = attributes.modifierType;
    this.itemType = 'upgrade';
  }
});

var ClickerView = Marionette.ItemView.extend({
  template: '#clicker',
  events: {
    'click': 'onClick'
  },
  onClick: function() {
    var clickTimeout = this.clickTimeout;
    var currentTime = (new Date().getTime()) / 1000;
    // Implement throttling logic to limit the effect of scripting.
    if (!clickTimeout || (currentTime - clickTimeout) > 0.5 /* half a second */) {
      // Propogate event to the application level.
    }
    this.clickTimeout = currentTime;
  }
});

var ItemView = Marionette.ItemView.extend({
  template: '#item',
  events: {
    'click .buy': 'onClick',
    'hover': 'onHover'
  },
  onClick: function() {
    this.triggerMethod('click:item', this.model);
  }
});

var ItemCollectionView = Marionette.CollectionView.extend({
  childView: ItemView,
  initialize: function(attributes, options) {
    this.clickCallback = attributes.callback;
  },
  childEvents: {
    'click:item': function(o) {
      if (this.clickCallback) {
        this.clickCallback(o);
      }
    }
  }
});

var Application = Marionette.Application.extend({
  initialize: function(options) {
    options = options || {};
    this.storageKey = options.storageKey || 'math';
    this.localStorage = window.localStorage;
    this.data = {
      calculators: 0,
      // Calculators per second
      cps: 0,
      // Calculators per click
      cpc: 1,
      upgrades: {},
      items: {},
      achievements: []
    };
    this.load();
  },
  checkAchievements: function(achievement) {
  },
  purchase: function(o) {
    if (o.cost <= this.calculators) {
      this.calculators -= o.cost;
    }
    if (o.type === 'upgrade') {
      this.upgradePurchased(o);
    } else if (o.type === 'store') {
      this.itemPurchased(o);
    } else {
      throw TypeError('Unknown item type purchased: ' + o.type);
    }
  },
  itemPurchased: function(item) {
    // Update the store item
    item.count += 1;

    if (typeof this.items[item.name] === 'undefined') {
      this.items[item.name] = {
        count: 1,
        type: item.type,
        baseValue: item.value,
        modifiers: []
      };
    } else {
      this.items[item.name].count += 1;
    }
    this.updateData();
  },
  upgradePurchased: function(upgrade) {
    var target = upgrade.modifierTarget;
    upgrade.purchased = true;
    if (typeof upgrade.modifierTarget === 'string') {
      target = [upgrade.modifierTarget];
    }

    var self = this;
    target.forEach(function(t) {
      self.items[t].modifiers.push({
        modifierRate: upgrade.modifierRate,
        modifierType: upgrade.modifierType,
        modifierTarget: upgrade.modifierTarget
      });
    });

    this.updateData();
  },
  updateData: function() {
    var cps = 0;
    var cpc = 1;
    var self = this;
    // Determine our new values by iterating over our cached
    // items list.
    Object.keys(this.items).forEach(function(itemKey) {
      var item = self.items[itemKey];
      var value = item.baseValue;
      item.modifiers.forEach(function(modifier) {
        if (modifier.modifierType == 'flat') {
          value = value + modifier.modifierRate;
        } else if (modifier.modifierType == 'percent') {
          value = value * modifier.modifierRate;
        } else {
          throw TypeError('Unknown modifier type: ' + modifier.modifierType);
        }
      });
      if (item.type == 'click') {
        cpc += value;
      } else if (item.type == 'cps') {
        cps += value;
      } else {
        throw TypeError('Unknown item type: ' + item.type);
      }
    });
    // Update our cached values for our calculators per click/second.
    this.data.cps = cps;
    this.data.cpc = cpc;
  },
  save: function() {
    if (this.localStorage) {
      this.localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }
  },
  load: function() {
    if (this.localStorage && this.localStorage[this.storageKey]) {
      this.data = JSON.parse(this.localStorage[this.storageKey]);
    }
  }
});
