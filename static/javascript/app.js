/*global Marionette, Backbone, _, $, jQuery, setInterval, clearInterval */
var oldWindow = window;

(function(window, $, _, Backbone, Marionette, Items) {
  var Events = _.extend({}, Backbone.Events);
  var GameItems = $.extend(true /* deep */, {}, Items);

  var GameInfo = Backbone.Model.extend({
    initialize: function(attributes, options) {
      this.set('calculators', 0);
      this.set('time', 0);
      this.set('cps', 0);
    }
  });

  var Achievement = Backbone.Model.extend({
    initialize: function(attributes, options) {
      if (typeof attributes.name !== 'string' || typeof attributes.description !== 'string') {
        throw TypeError('Expected a name and description for Achievement.');
      } else if (typeof attributes.condition !== 'function') {
        throw TypeError('Expected to be passed a condition function.');
      }
      this.set('name', attributes.name);
      this.set('description', attributes.description);
      this.set('condition', attributes.condition);
      this.set('achieved', attributes.achieved ? true : false);
      this.set('itemType', 'achievement');
    },
    checkAchieved: function(data) {
      if (this.condition(_.extend({}, data))) {
        this.set('achieved', true);
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
      this.set('name', attributes.name);
      this.set('description', attributes.description);
      this.set('count', (attributes.count ? attributes.count : 0));
      this.set('available', false);
      this.set('cost', attributes.cost);
      this.set('value', attributes.value);

      // One of either 'click' or 'cps'.
      this.set('type', attributes.type);
      this.set('itemType', 'store');
    }
  });

  var Upgrade = Backbone.Model.extend({
    initialize: function(attributes, options) {
      if (typeof attributes.name !== 'string' || typeof attributes.description !== 'string') {
        throw TypeError('Expected a name and description for Upgrade.');
      } else if (typeof attributes.modifierTarget !== 'string') {
        throw TypeError('Expected a modifier target.');
      }
      this.set('name', attributes.name);
      this.set('description', attributes.description);
      this.set('purchased', (attributes.purchased ? true : false));
      this.set('available', false);
      this.set('cost', attributes.cost);
      this.set('modifierTarget', attributes.modifierTarget);

      // A float that represents either a flat amount for which to increase or
      // the percantage for which to modify.
      this.set('modifierRate', attributes.modifierRate);

      // One of either 'percent' or 'flat'.
      this.set('modifierType', attributes.modifierType);
      this.set('itemType', 'upgrade');
    }
  });

  var AchievementCollection = Backbone.Collection.extend({
    model: Achievement
  });

  var StoreCollection = Backbone.Collection.extend({
    model: StoreItem
  });

  var UpgradeCollection = Backbone.Collection.extend({
    model: Upgrade
  });

  var ClickerView = Marionette.ItemView.extend({
    template: '#clicker-template',
    className: 'target',
    events: {
      'click img': 'onClick'
    },
    onClick: function() {
      var clickTimeout = this.clickTimeout;
      var currentTime = (new Date().getTime()) / 1000;
      // Implement throttling logic to limit the effect of scripting.
      if (!clickTimeout || (currentTime - clickTimeout) > 0.5 /* half a second */) {
        // Propogate event to the application level.
      }
      this.clickTimeout = currentTime;
      Events.trigger('clicker:clicked');
    }
  });

  var ClickerInfoView = Marionette.ItemView.extend({
    template: '#clicker-info-template',
    className: 'clicker-info',
    initialize: function(attributes, options) {
      this.model = attributes.model;
      this.model.on('change', this.render, this);
    }
  });

  var ItemView = Marionette.ItemView.extend({
    template: '#item-template',
    events: {
      'click .buy': 'onBuy',
      'hover': 'onHover'
    },
    initialize: function(attributes, options) {
      this.model.on('change', this.render, this);
    },
    onRender: function() {
      var available = this.model.get('available');
    },
    onBuy: function() {
      var type = this.model.get('itemType');
      if (type == 'store') {
        Events.trigger('purchase:item', this.model);
      } else if (type == 'upgrade') {
        Events.trigger('purchase:upgrade', this.model);
      } else {
        throw new TypeError('Unknown item type: ' + type);
      }
    }
  });

  var PointView = Marionette.View.extend({
    tagName: 'div',
    template: '#point-template',
    className: 'point',
    initialize: function(attributes, options) {
      this.$parent = attributes.parent;
      this.data = { value: attributes.value };
      this.$ = window.$ || window.jQuery;
    },
    render: function() {
      // Generate the position in which to layout the points.
      var $img = this.$parent.find('img').eq(0);
      var w = $img.width();
      var h = $img.height();
      var rand = Math.random();
      var vOffset = rand * (h - 20);
      var wOffset = $img.offset().left - 10 + Math.random() * (w - 60);
      var timeout = Math.max(600 /* ms */, rand * 1500);

      // Generate the DOM element from the template.
      var self = this;
      var html = $(this.template).html();
      var template = _.template(html);

      // Create the DOM element
      this.$el = $('<' + this.tagName + '/>')
        .append(template(this.data));

      // Add it to the parent element and animate it out.
      this
        .$el
        .addClass(this.className)
        .css('top', vOffset)
        .css('left', wOffset)
        .appendTo(this.$parent)
        .animate({
          top: '-=' + vOffset.toString() + 'px',
          opacity: 0
        }, timeout /* ms */, function() {
          self.remove();
        });
    }
  });

  var ItemCollectionView = Marionette.CollectionView.extend({
    className: 'app-item-list',
    childView: ItemView,
    initialize: function() {
      this.collection.on('after:item:added', this.render, this);
    }
  });

  var ClickerLayoutView = Marionette.LayoutView.extend({
    template: '#app-clicker-template',
    className: 'col col-4 text-center',
    regions: {
      clicker: '.app-clicker-region',
      info: '.app-clicker-info-region'
    },
    onRender: function() {
      this.showChildView('clicker', new ClickerView());
      Events.trigger('clicker:rendered', this);
    }
  });

  var ItemsLayoutView = Marionette.LayoutView.extend({
    template: '#app-items-template',
    className: 'col col-8',
    regions: {
      store: '.app-item-body .app-item-store',
      upgrades: '.app-item-body .app-item-upgrades',
      achievements: '.app-item-body .app-item-achievements'
    },
    onRender: function() {
      Events.trigger('items:rendered', this);
      this.headers = this.$el.find('.app-item-header ul li');
      this.unlocked = this.$el.find('#achievements-unlocked');
      this.attachListeners();
    },
    attachListeners: function() {
      var self = this;
      this.headers.on('click', function(ev) {
        var $el = $(this);
        var index = self.headers.index($el);
        var numRegions = 3;
        var regions = ['store', 'upgrades', 'achievements'];

        self.headers
          .removeClass('selected')
          .eq(index)
          .addClass('selected');

        switch (index) {
          case 0:
          case 1:
          case 2: {
            for (var i = 0; i < numRegions; i++) {
              self
                .regionManager
                .get(regions[i])
                .$el
                .removeClass('block')
                .removeClass('none')
                .addClass((index == i ? 'block' : 'none'));
            }
            break;
          }
          default:
            throw Error('Unknown index: ' + index.toString());
        }
      });
      this.headers.eq(0).click();
    }
  });

  var Application = Marionette.Application.extend({
    initialize: function(options) {
      options = options || {};
      this.storageKey = options.storageKey || 'math';
      this.localStorage = window.localStorage;
      this.data = {
        // Time that has elapsed since game began
        time: 0,
        calculators: 0,
        total: 0,
        clicks: 0,
        // Calculators per second
        cps: 0,
        // Calculators per click
        cpc: 1,
        upgrades: [],
        items: {},
        achievements: []
      };
      this.collections = {
        achievements: new AchievementCollection(),
        upgrades: new UpgradeCollection(),
        store: new StoreCollection()
      };
      this.defaultData = _.extend({}, this.data);
      this.info = new GameInfo();
      this.$ = window.$ || window.jQuery;
      this.$el = this.$('.app-container');
      this.load();
    },
    start: function() {
      this.registerListeners();
      this.layouts = {
        clickRegion: new ClickerLayoutView(),
        itemRegion: new ItemsLayoutView()
      };
      // Add the clicker region
      this.layouts.clickRegion.render();
      this.layouts.clickRegion.showChildView('info', new ClickerInfoView({
        model: this.info
      }));
      // Add the store region
      this.layouts.itemRegion.render();
      // Trigger an update
      this.loadItems();
      this.update();
      this.checkAchievements();
    },
    click: function() {
      var $target = this.layouts.clickRegion.clicker.$el;
      var view = new PointView({
        parent: $target,
        value: this.data.cpc
      });

      this.data.clicks += this.data.cpc;
      this.data.total += this.data.cpc;
      this.data.calculators += this.data.cpc;

      view.render();

      this.update();
      this.checkAchievements();
    },
    registerListeners: function() {
      var self = this;

      $(window).resize(function() {
        var h = $(window).height();
        var body = self.$el.find('.app-item-body');
        if (body.length > 0) {
          body.eq(0).css('height', h - body.offset().top - 20);
        }
      });

      Events.on('clicker:rendered', function(view) {
        view.$el.appendTo(self.$el.find('.table'));
      });

      Events.on('items:rendered', function(view) {
        view
          .$el
          .appendTo(self.$el.find('.table'));

        self.storeCollectionView = new ItemCollectionView({
          collection: self.collections.store || []
        });

        self.upgradeCollectionView = new ItemCollectionView({
          collection: self.collections.upgrades || []
        });

        self.achievementCollectionView = new ItemCollectionView({
          collection: self.collections.achievements || []
        });

        self.layouts.itemRegion.showChildView('store', self.storeCollectionView);
        self.layouts.itemRegion.showChildView('upgrades', self.upgradeCollectionView);
        self.layouts.itemRegion.showChildView('achievements', self.achievementCollectionView);

        $(window).resize();
      });

      Events.on('clicker:clicked', function() {
        self.click();
      });

      Events.on('purchase:upgrade', function(o) {
        self.upgradePurchase(o);
      });

      Events.on('purchase:item', function(o) {
        self.itemPurchase(o);
      });

      $(window).resize();

      this.interval = setInterval(function() {
        self.data.time += 1;
        self.data.total += self.data.cps;
        self.data.calculators += self.data.cps;
        self.update();
        self.checkAchievements();
      }, 1000 /* 1 second */);
    },
    checkAchievements: function(achievement) {
      var achievements = GameItems.achievements;
      var earned = this.data.achievements;
      var self = this;

      achievements.forEach(function(o) {
        if (earned.indexOf(o.name) === -1) {
          var clone = $.extend(true /* deep */, {
            _items: $.extend(true /* deep */, {}, GameItems)
          }, self.data);
          if (o.condition(clone)) {
            self.data.achievements.push(o.name);
            self.collections.achievements.add(new Achievement({
              name: o.name,
              description: o.description,
              condition: o.condition,
              achieved: true
            }));
          }
        }
      });

      var unlocked = this
        .collections
        .achievements
        .length
        .toString();

      var total = achievements
        .length
        .toString();

      this
        .layouts
        .itemRegion
        .unlocked
        .text('(' + unlocked + '/' + total + ')');
      this.save();
    },
    itemPurchase: function(item) {
      var self = this;
      var cost = item.get('cost');
      if (cost > this.data.calculators) {
        return;
      }

      var name = item.get('name');
      this.data.calculators -= cost;
      item.set('count', item.get('count') + 1);

      // Check if we should add any upgrades to be now visible
      var upgrades = GameItems.upgrades;
      upgrades.forEach(function(upgrade) {
        var targets = upgrade.modifierTarget;
        if (targets === name || targets.indexOf(name) > -1) {
          if (!self.collections.upgrades.where({ name: upgrade.name }).length) {
            var allExist = true;
            // This item always exist if the target is a string, otherwise we
            // need to check against all the targets.
            if (typeof targets !== 'string') {
              targets.forEach(function(target) {
                allExist = allExist && self.data.items[target].count > 0;
              });
            }
            // If all the items exist, then we want to add the upgrade to
            // our collection.
            if (allExist) {
              self.collections.upgrades.add(new Upgrade({
                name: upgrade.name,
                description: upgrade.description,
                cost: upgrade.cost,
                purchased: false, // should never be true here
                modifierTarget: upgrade.modifierTarget,
                modifierRate: upgrade.modifierRate,
                modifierType: upgrade.modifierType
              }));
            }
          }
        }
      });

      for (var i = 0; i < this.collections.store.length; i++) {
        var model = this.collections.store.at(i);
        if (model.name === name) {
          model.set('count', model.get('count') + 1);
          break;
        }
      }

      if (typeof this.data.items[name] === 'undefined') {
        this.data.items[name] = {
          count: 1,
          type: item.get('type'),
          baseValue: item.get('value'),
          modifiers: []
        };
      } else {
        this.data.items[name].count += 1;
      }

      this.updateData();
    },
    upgradePurchase: function(upgrade) {
      var cost = upgrade.get('cost');
      if (cost > this.data.calculators) {
        return;
      }

      var name = upgrade.get('name');
      var targets = upgrade.get('modifierTarget');

      upgrade.set('purchased', true);
      upgrade.purchased = true;

      this.data.calculators -= cost;
      this.data.upgrades.push(upgrade.get('name'));

      if (typeof targets === 'string') {
        targets = [targets];
      }

      for (var i = 0; i < this.collections.upgrades.length; i++) {
        var model = this.collections.upgrades.at(i);
        if (model.name === name) {
          model.set('purchased', true);
        }
      }

      var self = this;
      targets.forEach(function(target) {
        if (self.data.items[target]) {
          self.data.items[target].modifiers.push({
            modifierRate: upgrade.get('modifierRate'),
            modifierType: upgrade.get('modifierType'),
            modifierTarget: upgrade.get('modifierTarget')
          });
        }
      });

      this.updateData();
    },
    updateData: function() {
      var cps = 0;
      var cpc = 1;
      var self = this;

      // Determine our new values by iterating over our cached
      // items list.
      Object.keys(this.data.items).forEach(function(itemKey) {
        var item = self.data.items[itemKey];
        var value = item.baseValue * item.count;

        var isFlatModifier = function(modifier) {
          return modifier.modifierType === 'flat';
        };
        var baseModifiers = item.modifiers.filter(isFlatModifier);
        var percentModifiers = item.modifiers.filter(function(modifier) {
          return !isFlatModifier(modifier);
        });

        baseModifiers.forEach(function(modifier) {
          value += item.count * modifier.modifierRate;
        });

        var percent = 0;
        percentModifiers.forEach(function(modifier) {
          if (modifier.modifierType !== 'percent') {
            throw TypeError('Unknown modifier type: ' + modifier.modifierType);
          }
          percent += modifier.modifierRate;
        });

        value += value * percent;

        if (item.type == 'cpc') {
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
      this.update();
    },
    update: function() {
      // Update the available of the models based on our new information about
      // the number of calculators we have available.
      var model = null;
      var i = 0;
      var calculators = this.data.calculators;

      for (i = 0; i < this.collections.store.length; i++) {
        model = this.collections.store.at(i);
        if (model.get('cost') > calculators && model.get('available')) {
          model.set('available', false);
        } else if (model.get('cost') <= calculators && !model.get('available')) {
          model.set('available', true);
        }
      }

      for (i = 0; i < this.collections.upgrades.length; i++) {
        model = this.collections.upgrades.at(i);
        if (model.get('cost') > calculators && model.get('available')) {
          model.set('available', false);
        } else if (model.get('cost') <= calculators && !model.get('available')) {
          model.set('available', true);
        }
      }

      this.data.calculators = this.data.calculators;
      this.info.set('time', this.data.time);
      this.info.set('calculators', this.data.calculators.toFixed(2));
      this.info.set('cps', this.data.cps.toFixed(2));
      this.save();
    },
    save: function() {
      if (this.localStorage) {
        this.localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      }
    },
    load: function() {
      if (this.localStorage && this.localStorage[this.storageKey]) {
        var data = this.localStorage.getItem(this.storageKey);
        if (data && typeof data === 'string') {
          try {
            this.data = JSON.parse(data);
            if (typeof this.data.calculators === 'string') {
              this.data.calculators = parseFloat(this.data.calculators);
            } else {
              this.data.calculators = this.data.calculators;
            }
          } catch (err) { }
        }
      }
    },
    loadItems: function() {
      var self = this;
      var data = this.data || {};
      var items = GameItems;
      var achievements = items.achievements;
      var store = items.store;
      var upgrades = items.upgrades;

      this.collections.upgrades.reset();
      this.collections.achievements.reset();
      this.collections.store.reset();

      achievements.forEach(function(o) {
        if (data.achievements.indexOf(o.name) > -1) {
          self.collections.achievements.add(new Achievement({
            name: o.name,
            description: o.description,
            condition: o.condition,
            achieved: true
          }));

          self.data.achievements.push(o.name);
        }
      });

      store.forEach(function(o) {
        var count = 0;
        if (typeof data.items[o.name] !== 'undefined') {
          count = data.items[o.name].count;
        }

        if (o.name && o.name.length) {
          self.collections.store.add(new StoreItem({
            name: o.name,
            description: o.description,
            cost: o.cost,
            value: o.value,
            type: o.type,
            count: count
          }));

          self.data.items[o.name] = {
            count: count,
            type: o.type,
            baseValue: o.value,
            modifiers: []
          };
        }
      });

      upgrades.forEach(function(o) {
        var purchased = (data.upgrades.indexOf(o.name) > -1 ? true : false);

        if (o.name && o.name.length) {
          var targets = [];
          var allExist = true;
          if (typeof o.modifierTarget === 'string') {
            targets.push(o.modifierTarget);
          } else {
            targets = o.modifierTarget;
          }

          targets.forEach(function(target) {
            allExist = allExist && self.data.items[target].count > 0;
          });

          if (allExist) {
            self.collections.upgrades.add(new Upgrade({
              name: o.name,
              description: o.description,
              cost: o.cost,
              purchased: purchased,
              modifierTarget: o.modifierTarget,
              modifierRate: o.modifierRate,
              modifierType: o.modifierType
            }));

            if (purchased) {
              var target = o.modifierTarget;
              if (typeof target === 'string') {
                target = [target];
              }

              self.data.upgrades.push(o.name);

              target.forEach(function(t) {
                self.data.items[t].modifiers.push({
                  modifierRate: o.modifierRate,
                  modifierType: o.modifierType,
                  modifierTarget: o.modifierTarget
                });
              });
            }
          }
        }
      });

      this.updateData();
    },
    clear: function() {
      this.data = _.extend({}, this.defaultData);
      this.update();
      this.loadItems();
      this.save();
    }
  });

  $(window).ready(function() {
    console.log('%cCalculator Clicker',
      'font-size: 20px; color: black; font-variant: small-caps;');
    var app = new Application();
    app.start();
    oldWindow.reset = function() {
      app.clear();
    };
  });
})(window,
   window.$ || window.jQuery,
   window._ || window.underscore,
   window.Backbone,
   window.Marionette || window.Mn,
   window.Items || []);
