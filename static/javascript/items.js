var Items = {
  store: [
    {
      name: 'Additional Button',
      description: 'If only you had more fingers...',
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
      description: 'They just really want to be Graduate students.',
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
      name: 'Calculator Factory',
      description: 'Produces large quantities of calculators.',
      value: 10,
      cost: 3000,
      type: 'cps'
    },
    {
      name: 'Calculator Mine',
      description: 'Down in the depths of the calculator mines.',
      value: 40,
      cost: 10000,
      type: 'cps'
    },
    {
      name: 'Planet Calculator',
      description: 'Flying calculators straight from space and down to Earth.',
      value: 100,
      cost: 40000,
      type: 'cps'
    },
    {
      name: 'Cloning Machine',
      description: 'One calculator go in, two calculators come out.',
      value: 400,
      cost: 200000,
      type: 'cps'
    },
    {
      name: 'Calculator Anamoly',
      description: 'An anamoly in the space time continuum producing calculators.',
      value: 3000,
      cost: 1000000,
      type: 'cps'
    },
    {
      name: 'Parallel Calcuverse',
      description: 'Greg\'s multiple universe theory was dicey, but now we can mine calculators across multiple Earths!',
      value: 8000,
      cost: 5000000,
      type: 'cps'
    },
    {
      name: 'Time Machine',
      description: 'Making calculators across time and space.',
      value: 100000,
      cost: 100000000,
      type: 'cps'
    },
    {
      name: 'Calculator Horizon',
      description: '"Gotta go to space. Yeah. Gotta go to space."',
      value: 1000000,
      cost: 3000000000,
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
    },
    {
      name: 'Extra Arms',
      description: 'Many arms make light work. Additional Buttons become twice as efficient.',
      cost: 50000,
      modifierTarget: 'Additional Button',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Double Digits',
      description: 'Double the fingers, double the clicks.  Cursors become twice as efficient.',
      cost: 1000,
      modifierTarget: 'Cursor',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Ambidextrous',
      description: '"Lefty, righty, it doesn\'t matter."  Cursors become twice as efficient.',
      cost: 10000,
      modifierTarget: 'Cursor',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Telekinesis',
      description: '"Look mah, no hands!"  Cursors gain +0.1 base CpS.',
      cost: 100000,
      modifierTarget: 'Cursor',
      modifierRate: 0.1,
      modifierType: 'flat'
    },
    {
      name: 'Viktor\'s Robotic Hand',
      description: '"Join the glorious evolution." - Viktor.  Cursors gain +2 base CpS.',
      cost: 10000000,
      modifierTarget: 'Cursor',
      modifierRate: 2,
      modifierType: 'flat'
    },
    {
      name: 'Spider Legs',
      description: '"Ah! Ah! Ah! I hate bugs! Oh, my gosh! What if I turn into a bug right now?!" - Billy.  Cursors gain +10 base CpS.',
      cost: 200000000,
      modifierTarget: 'Cursor',
      modifierRate: 10,
      modifiertype: 'flat'
    },
    {
      name: 'A Hundred Fingers',
      description: 'Clickety-clickety-click.  Cursors gain +25 base CpS.',
      cost: 1000000000,
      modifierTarget: 'Cursor',
      modifierRate: 25,
      modifierType: 'flat'
    },
    {
      name: '100-Type Guanyin Bodhisattva',
      description: '"That\'s a bad move, little ant!"  Cursors gain +100 base CpS.',
      cost: 10000000000,
      modifierTarget: 'Cursor',
      modifierRate: 100,
      modiferType: 'flat'
    },
    {
      name: 'NSERC-URSA',
      description: 'Funding, funding, funding!  Undergrad researchers gain +0.2 CpS.',
      cost: 1000,
      modifierTarget: 'Undergraduate Research Assistant',
      modifierRate: 0.2,
      modifierType: 'flat'
    },
    {
      name: 'Research journal publication',
      description: 'Undergraduate thesis published in an academic paper!  Undergrad researchers become twice as efficient.',
      cost: 100000,
      modifierTarget: 'Undergraduate Research Assistant',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Professor Recommendation',
      description: 'Recommendation from the professor for a Masters program!  Undergrad researchers become twice as efficient.',
      cost: 5000000,
      modifierTarget: 'Undergraduate Research Assistant',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Funding',
      description: 'Funding for the graduate program.  Graduate students gain +1 CpS.',
      cost: 5000,
      modifierTarget: 'Graduate Student',
      modifierRate: 1,
      modifierType: 'flat'
    },
    {
      name: 'Graduate Student 2.0',
      description: 'Version 2.0 of the Graduate Students.  Graduate students gain +10 CpS.',
      cost: 20000,
      modifierTarget: 'Graduate Student',
      modifierRate: 10,
      modifierType: 'flat'
    },
    {
      name: 'Three minute pitch',
      description: 'Winner of the three minute thesis competition.  Graduate students become twice as efficient.',
      cost: 100000,
      modifierTarget: 'Graduate Student',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'PHD Acceptance',
      description: 'Graduate students gain acceptance into a PHD program.  Graduate students become twice as efficient.',
      cost: 10000000,
      modifierTarget: 'Graduate Student',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: '100 Herbs and Spices',
      description: 'The Kernel\s secret recipe.  Factories gain +4 CpS.',
      cost: 30000,
      modifierTarget: 'Calculator Factory',
      modifierRate: 4,
      modifierType: 'flat'
    },
    {
      name: 'Goobacks',
      description: '"They took er jerbs!"  Factories become twice as efficient.',
      cost: 300000,
      modifierTarget: 'Calculator Factory',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Amazon Robots',
      description: '"This is truly the future."  Factories become twice as efficient.',
      cost: 5000000,
      modifierTarget: 'Calculator Factory',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Automated Factories',
      description: 'Fully automatic factories.  No humans necessary!  Factories become twice as efficient.',
      cost: 50000000,
      modifierTarget: 'Calculator Factory',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'TI 30X IIS',
      description: '"No more mining generic calculators, we\'ve struck TIs!" Mines gain +10 base CpS. (Math faculty approved)',
      cost: 100000,
      modifierTarget: 'Calculator Mine',
      modifierRate: 10,
      modifierType: 'flat'
    },
    {
      name: 'TI 83+ Graphing Calculator',
      description: '"We\'ve hit a gold mine!".  Mines gain +100 base CpS.',
      cost: 500000,
      modifierTarget: 'Calculator Mine',
      modifierRate: 100,
      modifierType: 'flat'
    },
    {
      name: 'Beedrill',
      description: '"Don\'t believe in yourself, Beedrill.  Believe in me who believes in you.' +
        'Yours is a drill that will pierce the heavens!"  Mines become twice as efficient!',
      cost: 1000000,
      modifierTarget: 'Calculator Mine',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Mega Beedrill',
      description: 'Time for a Mega-evolution.  Mines become twice as efficient!',
      cost: 10000000,
      modifierTarget: 'Calculator Mine',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Space Station',
      description: 'Relay point for Planet Calculator.  Shipments gain +30 CpS.',
      cost: 400000,
      modifierTarget: 'Planet Calculator',
      modifierRate: 30,
      modifierType: 'flat'
    },
    {
      name: 'Battlecruiser',
      description: '"Battlecruiser operational."  Shipments gain +60 CpS.',
      cost: 4000000,
      modifierTarget: 'Planet Calculator',
      modifierRate: 60,
      modifierType: 'flat'
    },
    {
      name: 'Yamato Cannons',
      description: '"Yamato Cannons online."  Blast through asteroids as shipmenets become twice as efficient.',
      cost: 40000000,
      modifierTarget: 'Planet Calculator',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Warp Drive',
      description: 'Bending the laws of physics.  Shipments become twice as efficient.',
      cost: 4000000000,
      modifierTarget: 'Planet Calculator',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Brave New World',
      description: 'Cloning Machines gain +100 CpS.',
      cost: 2000000,
      modifierTarget: 'Cloning Machine',
      modifierRate: 100,
      modifierType: 'flat'
    },
    {
      name: 'Double Cloning',
      description: 'Two clones are better than one.  Cloning Machines gain +500 CpS.',
      cost: 20000000,
      modifierTarget: 'Cloning Machine',
      modifierRate: 500,
      modifierType: 'flat'
    },
    {
      name: 'Magic Hammock',
      description: '"Now, before I abandon you in this cornfield, does anyone remember the way home?" - Homer.  Cloning Machines become twice as efficient.',
      cost: 200000000,
      modifierTarget: 'Cloning Machine',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Thermonuclear Cloning',
      description: '"We need more power!"  Cloning Machines become twice as efficient.',
      cost: 5000000000,
      modifierTarget: 'Cloning Machine',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Robotic Clones',
      description: 'Better in every way.  Cloning Machines become twice as efficient.',
      cost: 1000000000000,
      modifierTarget: 'Cloning Machine',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Mutated Calculators',
      description: 'They grow and split!  Calculator Anamolies gain +1,000 CpS.',
      cost: 20000000,
      modifierTarget: 'Calculator Anamoly',
      modifierRate: 1000,
      modifierType: 'flat'
    },
    {
      name: 'Calculator Trees',
      description: 'We don\'t know where they came from, but they work!  Calculator Anamolies are twice as efficient.',
      cost: 100000000,
      modifierTarget: 'Calculator Anamoly',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Calculator Fish',
      description: 'Another gift from the anamoly.  Calculator Anamolies are twice as efficient.',
      cost: 1000000000,
      modifierTarget: 'Calculator Anamoly',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Calculator Cows',
      description: 'Mooooooooooo!  Calculator Anamolies are twice as efficient.',
      cost: 50000000000,
      modifierTarget: 'Calculator Anamoly',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Calculator Rabbits',
      description: 'They\'re multiplying like rabbits!  Calculator Anamolies are twice as efficient.',
      cost: 1000000000000,
      modifierTarget: 'Calculator Anamoly',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Universal Funnel',
      description: 'Speed up transportation of calculators between universes.  Calculators generate at a rate of +10,000 CpS.',
      cost: 1000000000,
      modifierTarget: 'Parallel Calcuverse',
      modifierRate: 10000,
      modifierType: 'flat'
    },
    {
      name: 'Catbug',
      description: 'Have Catbug carry over the calculators for you.  Parallel Calculuverses become twice as efficient.',
      cost: 10000000000,
      modifierTarget: 'Parallel Calcuverse',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Portal',
      description: 'Speedy thing go in, speedy thing come out.  Parallel Calculuverses become twice as efficient.',
      cost: 100000000000,
      modifierTarget: 'Parallel Calcuverse',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Magic Door',
      description: 'A door leading to the parallel universe.  Parallel Calculuverses become twice as efficient.',
      cost: 1000000000000,
      modifierTarget: 'Parallel Calcuverse',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Warp Gate',
      description: 'Built through the study of Protoss technology.  Parallel Calculuverses become twice as efficient.',
      cost: 10000000000000,
      modifierTarget: 'Parallel Calcuverse',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Plutonium',
      description: 'Fuel it up!  Time Machines gain +100,000 CpS.',
      cost: 40000000000,
      modifierTarget: 'Time Machine',
      modifierRate: 100000,
      modifierType: 'flat'
    },
    {
      name: 'Flux Capacitor',
      description: 'Doc Brown kicking it into full gear.  Time Machines become twice as efficient.',
      cost: 400000000000,
      modifierTarget: 'Time Machine',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Perpetual Motion Machine',
      description: '"Lisa, in this house we obey the laws of thermodynamics!" - Homer.  Time Machines become twice as efficient.',
      cost: 4000000000000,
      modifierTarget: 'Time Machine',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Chrome Sheeting',
      description: 'Time travelling in style.  Time Machines become twice as efficient.',
      cost: 40000000000000,
      modifierTarget: 'Time Machine',
      modifierRate: 1,
      modifierType: 'percent'
    },
    {
      name: 'Tardis',
      description: 'It\'s so much bigger on the inside.  Time Machines become thrice as efficient.',
      cost: 400000000000000,
      modifierTarget: 'Time Machine',
      modifierRate: 2,
      modifierType: 'percent'
    },
    {
      name: 'Space Calculators',
      description: 'Calculators from space.  Generate calculators at +1,000,000 CpS.',
      cost: 700000000000,
      modifierTarget: 'Calculator Horizon',
      modifierRate: 1000000,
      modifierType: 'flat'
    },
    {
      name: 'Wormhole-safe Calculators',
      description: 'Calculators resistant to the effects of spacetime.  Generate calculators 3 times as efficient.',
      cost: 7000000000000,
      modifierTarget: 'Calculator Horizon',
      modifierRate: 2,
      modifierType: 'percent'
    },
    {
      name: 'The Ultimate Calculator',
      description: 'The calculator to end all calculators.  Generate calculators 5 times as efficient.',
      cost: 7000000000000000,
      modifierTarget: 'Calculator Horizon',
      modifierRate: 4,
      modifierType: 'percent'
    }
  ],
  achievements: [
    {
      name: 'Baby\'s First Steps',
      description: 'Made one calculator by hand.',
      condition: function(data) {
        return data.clicks > 0;
      }
    },
    {
      name: 'One Dozen',
      description: 'Made one dozen calculators by hand.',
      condition: function(data) {
        return data.clicks >= 12;
      }
    },
    {
      name: 'One Hundred Fingers',
      description: 'Made one hundred calculators by hand.',
      condition: function(data) {
        return data.clicks >= 100;
      }
    },
    {
      name: 'One Thousand Clicks',
      description: 'Made one thousands calculators by hand.',
      condition: function(data) {
        return data.clicks >= 1000;
      }
    },
    {
      name: 'One Million Clicks',
      description: 'Made one million calculators by hand.',
      condition: function(data) {
        return data.clicks >= 1000000;
      }
    },
    {
      name: 'Carpel Tunnel Syndrome',
      description: 'Made one billion calculators by hand.',
      condition: function(data) {
        return data.clicks >= 1000000000;
      }
    },
    {
      name: 'A Minute of Your Time',
      description: 'You have spent a minute on Calculator Clicker.',
      condition: function(data) {
        return data.time >= 60;
      }
    },
    {
      name: 'Five Minutes of Fame',
      description: 'You have spent five minutes on Calculator Clicker.',
      condition: function(data) {
        return data.time >= 60 * 5;
      }
    },
    {
      name: 'An Hour of Time',
      description: 'You have spent an hour on Calculator Clicker.',
      condition: function(data) {
        return data.time >= 60 * 60;
      }
    },
    {
      name: 'Half a Day Down the Drain',
      description: 'You have spent half a day playing Calculator Clicker.',
      condition: function(data) {
        return data.time >= 60 * 60 * 12;
      }
    },
    {
      name: 'Addict',
      description: 'You have spent an entire day playing Calculator Clicker.',
      condition: function(data) {
        return data.time >= 60 * 60 * 24;
      }
    },
    {
      name: 'Couch Potato',
      description: 'You have spent an entire week playing Calculator Clicker.',
      condition: function(data) {
        return data.time >= 60 * 60 * 24 * 7;
      }
    },
    {
      name: 'Zombie',
      description: 'You have spent an entire month playing Calculator Clicker.  Goddamn!',
      condition: function(data) {
        return data.time >= 60 * 60 * 24 * 7 * 4;
      }
    },
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
    },
    {
      name: 'Billionaire',
      descriptioon: 'Make one billion calculators.',
      condition: function(data) {
        return data.total >= 1000000000;
      }
    },
    {
      name: 'Trillionaire',
      description: 'Make one trillion calculators.',
      condition: function(data) {
        return data.total >= 1000000000000;
      }
    },
    {
      name: 'Quadrillionaire',
      description: 'Make one quadrillion calculators.',
      condition: function(data) {
        return data.total >= 1000000000000000;
      }
    },
    {
      name: 'Calculator Empire',
      description: 'Make one quantillion calculators.',
      condition: function(data) {
        return data.total >= 1000000000000000000;
      }
    },
    {
      name: 'Funded',
      description: 'Successfully funded the graduate and undergraduate programs.',
      condition: function(data) {
        var undergradName = 'NSERC-URSA';
        var gradName = 'Funding';
        return data.upgrades.indexOf(undergradName) > -1 && data.upgrades.indexOf(gradName) > -1;
      }
    },
    {
      name: 'Hunter X Hunter',
      description: 'Chairman of the Hunter Association.',
      condition: function(data) {
        var upgradeName = '100-Type Guanyin Bodhisattva';
        return data.upgrades.indexOf(upgradeName) > -1;
      }
    },
    {
      name: 'Professor',
      description: 'Let the graduate students do the marking.',
      condition: function(data) {
        var name = 'Graduate Student';
        if (typeof data[name] !== 'undefined') {
          return data[name].count >= 3;
        }
        return false;
      }
    },
    {
      name: 'One Second.  One Job.',
      description: 'Mines can build enough calculators to supply all first-years in a second.',
      condition: function(data) {
        var numFirstYears = 1450;
        var cps = 10;
        var upgradeName = 'TI 30X IIS';
        var itemName = 'Calculator Mine';
        return data.upgrades.indexOf(upgradeName) > -1 &&
          data.items[itemName] && data.items[itemName].count >= numFirstYears / cps;
      }
    },
    {
      name: 'StarCraft',
      description: 'Hell, it\'s about time.',
      condition: function(data) {
        var names = [
          'Battlecruiser',
          'Yamato Cannons',
          'Warp Gate'
        ];
        var upgrades = data.upgrades.filter(function(upgradeName) {
          return names.indexOf(upgradeName) != -1;
        });
        return (upgrades.length == names.length);
      }
    },
    {
      name: 'Simpsons',
      description: 'D\'Oh!',
      condition: function(data) {
        var names = [
          'Magic Hammock',
          'Perpetual Motion Machine'
        ];
        var upgrades = data.upgrades.filter(function(upgradeName) {
          return names.indexOf(upgradeName) != -1;
        });
        return (upgrades.length == names.length) && data.items['Graduate Student'].count > 0;
      }
    },
    {
      name: 'Sci-Fi',
      description: 'Futurama, StarCraft, Back to the Future...all your sci-fi staples!',
      condition: function(data) {
        var names = [
          'Battlecruiser',
          'Yamato Cannons',
          'Brave New World',
          'Portal',
          'Warp Gate',
          'Plutonium',
          'Flux Capacitor',
          'Tardis'
        ];
        var upgrades = data.upgrades.filter(function(upgradeName) {
          return names.indexOf(upgradeName) != -1;
        });
        return (upgrades.length == names.length);
      }
    },
    {
      name: 'I am Catbug!',
      description: '"Yeah, but I don\'t know how to make myself go there. Maybe it might never happen again!"',
      condition: function(data) {
        return data.upgrades.indexOf('Catbug') != -1;
      }
    },
    {
      name: 'Gas-Powered Stick',
      description: 'Never runs out of gas!',
      condition: function(data) {
        return data.upgrades.indexOf('Catbug') != -1 && data.upgrades.indexOf('Perpetual Motion Machine') != -1;
      }
    },
    {
      name: 'Cave Johnson',
      description: '"Cave here. The real Cave. Greg\'s been crunching some numbers here on Earth Prime. Turns out, the likelihood of me being the only Cave who likes talking to test subjects is -- right. Zero."',
      condition: function(data) {
        return data.upgrades.indexOf('Portal') != -1 && data.items['Parallel Calcuverse'].count >= 100;
      }
    },
    {
      name: 'Gotta Catch \'Em All',
      description: 'Buy every item and upgrade in the store.',
      condition: function(data) {
        var itemTotal = data._items.store.length;
        var upgradeTotal = data._items.upgrades.length;
        var total = itemTotal + upgradeTotal;
        return (data.items.length + data.upgrades.length) == total;
      }
    }
  ]
};
