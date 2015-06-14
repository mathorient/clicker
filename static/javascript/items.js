var Items = {
  store: [
    {
      name: 'Additional Button',
      description: 'Increases your calculators per click by the power of programming!',
      value: 1,
      cost: 10,
      type: 'cpc'
    },
    {
      name: 'Cursor',
      description: 'An auto-clicker to generate calculators for you.',
      value: 0.1,
      cost: 15,
      type: 'cps'
    }
  ],
  upgrades: [
    {
      name: 'Gaming Mouse',
      description: 'Upgrade your \'Additional Button\' into a gaming mouse to make clicking easier.',
      cost: 50,
      modifierTarget: 'Additional Button',
      modifierRate: 0.5,
      modifierType: 'percent'
    }
  ],
  achievements: [
    {
      name: 'My First Hundred',
      description: 'Make one hundred calculators.',
      condition: function(data) {
        return data.total >= 100;
      }
    }
  ]
};
