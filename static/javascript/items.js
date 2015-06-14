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
    },
    {
      name: 'Undergraduate Research Assistant',
      description: '',
      value: 0.5,
      cost: 100,
      type: 'cps'
    },
    {
      name: 'Graduate Student',
      description: 'Don\'t make fun of grad students.  They just made a terrible life choice.',
      value: 4,
      cost: 500,
      type: 'cps'
    },
    {
      name: 'Factory',
      description: '',
      value: 10,
      cost: 3000,
      type: 'cps'
    },
    {
      name: 'Mine',
      description: '',
      value: 40,
      cost: 10000,
      type: 'cps'
    },
    {
      name: 'Planet Calculon',
      description: '',
      value: 100,
      cost: 40000,
      type: 'cps'
    },
    {
      name: 'Cloning Machine',
      description: '',
      value: 400,
      cost: 200000,
      type: 'cps'
    },
    {
      name: 'Calculator Anamoly',
      description: '',
      value: 3000,
      cost: 1000000,
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
    },
    {
      name: 'My First Thousand',
      description: 'Make one thousand calculators.',
      condition: function(data) {
        return data.total >= 1000;
      }
    },
    {
      name: 'Million Dollar Man',
      description: 'Make one million calculators.',
      condition: function(data) {
        return data.total >= 1000000;
      }
    }
  ]
};
