import { Team } from './interfaces'

const teamsDefault: Team[] = [
  {
    name: 'NOVA',
    players: [
      {
        name: 'Oscare',
        stat: {
          role: 'capitan',
          reaction: 0.345,
          accuracy: 0.864,
          sprayControl: 0.332,
          flicksControl: 0.836,
          nades: 0.835,
          aggression: 0.345,
          tactics: 0.493,
          stamina: 0.655,
        },
      },
      {
        name: 'Header',
        stat: {
          role: 'rifler',
          reaction: 0.454,
          accuracy: 0.556,
          sprayControl: 0.515,
          flicksControl: 0.454,
          nades: 0.821,
          aggression: 0.651,
          tactics: 0.769,
          stamina: 0.788,
        },
      },
      {
        name: 'Modest',
        stat: {
          role: 'rifler',
          reaction: 0.269,
          accuracy: 0.639,
          sprayControl: 0.695,
          flicksControl: 0.675,
          nades: 0.388,
          aggression: 0.7,
          tactics: 0.653,
          stamina: 0.754,
        },
      },
      {
        name: 'Olaph',
        stat: {
          role: 'sniper',
          reaction: 0.346,
          accuracy: 0.375,
          sprayControl: 0.81,
          flicksControl: 0.746,
          nades: 0.564,
          aggression: 0.56,
          tactics: 0.364,
          stamina: 0.389,
        },
      },
      {
        name: 'Roller',
        stat: {
          role: 'support',
          reaction: 0.499,
          accuracy: 0.731,
          sprayControl: 0.527,
          flicksControl: 0.619,
          nades: 0.361,
          aggression: 0.483,
          tactics: 0.842,
          stamina: 0.632,
        },
      },
    ],
  },
  {
    name: 'Vangard',
    players: [
      {
        name: 'Collector',
        stat: {
          role: 'capitan',
          reaction: 0.437,
          accuracy: 0.742,
          sprayControl: 0.479,
          flicksControl: 0.79,
          nades: 0.664,
          aggression: 0.703,
          tactics: 0.751,
          stamina: 0.377,
        },
      },
      {
        name: 'Nelo',
        stat: {
          role: 'rifler',
          reaction: 0.217,
          accuracy: 0.422,
          sprayControl: 0.367,
          flicksControl: 0.814,
          nades: 0.421,
          aggression: 0.461,
          tactics: 0.758,
          stamina: 0.894,
        },
      },
      {
        name: 'Brad',
        stat: {
          role: 'rifler',
          reaction: 0.485,
          accuracy: 0.839,
          sprayControl: 0.668,
          flicksControl: 0.713,
          nades: 0.337,
          aggression: 0.531,
          tactics: 0.886,
          stamina: 0.344,
        },
      },
      {
        name: 'Silver',
        stat: {
          role: 'sniper',
          reaction: 0.285,
          accuracy: 0.444,
          sprayControl: 0.648,
          flicksControl: 0.392,
          nades: 0.306,
          aggression: 0.399,
          tactics: 0.521,
          stamina: 0.411,
        },
      },
      {
        name: 'Colour',
        stat: {
          role: 'support',
          reaction: 0.412,
          accuracy: 0.717,
          sprayControl: 0.42,
          flicksControl: 0.862,
          nades: 0.834,
          aggression: 0.735,
          tactics: 0.352,
          stamina: 0.59,
        },
      },
    ],
  },
  {
    name: 'Quazars',
    players: [
      {
        name: 'Octopus',
        stat: {
          role: 'capitan',
          reaction: 0.321,
          accuracy: 0.385,
          sprayControl: 0.855,
          flicksControl: 0.596,
          nades: 0.339,
          aggression: 0.318,
          tactics: 0.89,
          stamina: 0.522,
        },
      },
      {
        name: 'Rossan',
        stat: {
          role: 'rifler',
          reaction: 0.327,
          accuracy: 0.732,
          sprayControl: 0.845,
          flicksControl: 0.857,
          nades: 0.406,
          aggression: 0.363,
          tactics: 0.509,
          stamina: 0.673,
        },
      },
      {
        name: 'Awesome',
        stat: {
          role: 'rifler',
          reaction: 0.259,
          accuracy: 0.81,
          sprayControl: 0.494,
          flicksControl: 0.364,
          nades: 0.559,
          aggression: 0.635,
          tactics: 0.389,
          stamina: 0.425,
        },
      },
      {
        name: 'NBF',
        stat: {
          role: 'sniper',
          reaction: 0.265,
          accuracy: 0.625,
          sprayControl: 0.742,
          flicksControl: 0.887,
          nades: 0.826,
          aggression: 0.676,
          tactics: 0.67,
          stamina: 0.331,
        },
      },
      {
        name: 'Scelt',
        stat: {
          role: 'support',
          reaction: 0.317,
          accuracy: 0.758,
          sprayControl: 0.823,
          flicksControl: 0.302,
          nades: 0.577,
          aggression: 0.784,
          tactics: 0.728,
          stamina: 0.812,
        },
      },
    ],
  },
  {
    name: 'Eagles',
    players: [
      {
        name: 'Cloudy',
        stat: {
          role: 'capitan',
          reaction: 0.273,
          accuracy: 0.429,
          sprayControl: 0.8,
          flicksControl: 0.674,
          nades: 0.401,
          aggression: 0.89,
          tactics: 0.598,
          stamina: 0.696,
        },
      },
      {
        name: 'B8Loo',
        stat: {
          role: 'rifler',
          reaction: 0.307,
          accuracy: 0.768,
          sprayControl: 0.581,
          flicksControl: 0.383,
          nades: 0.475,
          aggression: 0.472,
          tactics: 0.342,
          stamina: 0.598,
        },
      },
      {
        name: 'Newton',
        stat: {
          role: 'rifler',
          reaction: 0.288,
          accuracy: 0.484,
          sprayControl: 0.334,
          flicksControl: 0.879,
          nades: 0.315,
          aggression: 0.593,
          tactics: 0.587,
          stamina: 0.343,
        },
      },
      {
        name: 'Serpe',
        stat: {
          role: 'sniper',
          reaction: 0.331,
          accuracy: 0.668,
          sprayControl: 0.799,
          flicksControl: 0.684,
          nades: 0.453,
          aggression: 0.656,
          tactics: 0.62,
          stamina: 0.846,
        },
      },
      {
        name: 'Lancar',
        stat: {
          role: 'support',
          reaction: 0.273,
          accuracy: 0.628,
          sprayControl: 0.486,
          flicksControl: 0.8,
          nades: 0.806,
          aggression: 0.469,
          tactics: 0.669,
          stamina: 0.771,
        },
      },
    ],
  },
  {
    name: 'Guardians',
    players: [
      {
        name: 'Macro',
        stat: {
          role: 'capitan',
          reaction: 0.23,
          accuracy: 0.483,
          sprayControl: 0.381,
          flicksControl: 0.712,
          nades: 0.567,
          aggression: 0.672,
          tactics: 0.874,
          stamina: 0.541,
        },
      },
      {
        name: 'Zoom',
        stat: {
          role: 'rifler',
          reaction: 0.21,
          accuracy: 0.608,
          sprayControl: 0.518,
          flicksControl: 0.376,
          nades: 0.584,
          aggression: 0.871,
          tactics: 0.619,
          stamina: 0.739,
        },
      },
      {
        name: 'Smith',
        stat: {
          role: 'rifler',
          reaction: 0.404,
          accuracy: 0.497,
          sprayControl: 0.389,
          flicksControl: 0.519,
          nades: 0.605,
          aggression: 0.654,
          tactics: 0.428,
          stamina: 0.421,
        },
      },
      {
        name: 'Focus',
        stat: {
          role: 'sniper',
          reaction: 0.441,
          accuracy: 0.822,
          sprayControl: 0.595,
          flicksControl: 0.537,
          nades: 0.652,
          aggression: 0.506,
          tactics: 0.844,
          stamina: 0.582,
        },
      },
      {
        name: 'Invincible',
        stat: {
          role: 'support',
          reaction: 0.428,
          accuracy: 0.833,
          sprayControl: 0.813,
          flicksControl: 0.393,
          nades: 0.647,
          aggression: 0.708,
          tactics: 0.875,
          stamina: 0.766,
        },
      },
    ],
  },
  {
    name: 'University',
    players: [
      {
        name: 'Dach',
        stat: {
          role: 'capitan',
          reaction: 0.251,
          accuracy: 0.718,
          sprayControl: 0.386,
          flicksControl: 0.641,
          nades: 0.67,
          aggression: 0.648,
          tactics: 0.833,
          stamina: 0.804,
        },
      },
      {
        name: 'Theater',
        stat: {
          role: 'rifler',
          reaction: 0.47,
          accuracy: 0.705,
          sprayControl: 0.347,
          flicksControl: 0.355,
          nades: 0.444,
          aggression: 0.444,
          tactics: 0.69,
          stamina: 0.324,
        },
      },
      {
        name: 'Salivan',
        stat: {
          role: 'rifler',
          reaction: 0.278,
          accuracy: 0.766,
          sprayControl: 0.631,
          flicksControl: 0.684,
          nades: 0.619,
          aggression: 0.312,
          tactics: 0.809,
          stamina: 0.621,
        },
      },
      {
        name: 'Faker',
        stat: {
          role: 'sniper',
          reaction: 0.421,
          accuracy: 0.401,
          sprayControl: 0.455,
          flicksControl: 0.499,
          nades: 0.301,
          aggression: 0.856,
          tactics: 0.563,
          stamina: 0.791,
        },
      },
      {
        name: 'Boxer',
        stat: {
          role: 'support',
          reaction: 0.435,
          accuracy: 0.512,
          sprayControl: 0.52,
          flicksControl: 0.658,
          nades: 0.847,
          aggression: 0.795,
          tactics: 0.666,
          stamina: 0.43,
        },
      },
    ],
  },
  {
    name: 'Five',
    players: [
      {
        name: 'Gepard',
        stat: {
          role: 'capitan',
          reaction: 0.355,
          accuracy: 0.376,
          sprayControl: 0.58,
          flicksControl: 0.75,
          nades: 0.859,
          aggression: 0.821,
          tactics: 0.662,
          stamina: 0.556,
        },
      },
      {
        name: 'Super',
        stat: {
          role: 'rifler',
          reaction: 0.322,
          accuracy: 0.67,
          sprayControl: 0.694,
          flicksControl: 0.49,
          nades: 0.804,
          aggression: 0.838,
          tactics: 0.346,
          stamina: 0.808,
        },
      },
      {
        name: 'Bait',
        stat: {
          role: 'rifler',
          reaction: 0.313,
          accuracy: 0.824,
          sprayControl: 0.55,
          flicksControl: 0.317,
          nades: 0.448,
          aggression: 0.652,
          tactics: 0.503,
          stamina: 0.663,
        },
      },
      {
        name: 'Fury',
        stat: {
          role: 'sniper',
          reaction: 0.411,
          accuracy: 0.847,
          sprayControl: 0.881,
          flicksControl: 0.549,
          nades: 0.827,
          aggression: 0.407,
          tactics: 0.404,
          stamina: 0.869,
        },
      },
      {
        name: 'Pretios',
        stat: {
          role: 'support',
          reaction: 0.408,
          accuracy: 0.693,
          sprayControl: 0.474,
          flicksControl: 0.494,
          nades: 0.875,
          aggression: 0.472,
          tactics: 0.313,
          stamina: 0.55,
        },
      },
    ],
  },
  {
    name: 'Dream',
    players: [
      {
        name: 'Soul',
        stat: {
          role: 'capitan',
          reaction: 0.233,
          accuracy: 0.805,
          sprayControl: 0.47,
          flicksControl: 0.803,
          nades: 0.536,
          aggression: 0.508,
          tactics: 0.424,
          stamina: 0.323,
        },
      },
      {
        name: 'Faris',
        stat: {
          role: 'rifler',
          reaction: 0.222,
          accuracy: 0.769,
          sprayControl: 0.819,
          flicksControl: 0.898,
          nades: 0.727,
          aggression: 0.593,
          tactics: 0.582,
          stamina: 0.502,
        },
      },
      {
        name: 'Electron',
        stat: {
          role: 'rifler',
          reaction: 0.366,
          accuracy: 0.335,
          sprayControl: 0.666,
          flicksControl: 0.732,
          nades: 0.87,
          aggression: 0.873,
          tactics: 0.43,
          stamina: 0.852,
        },
      },
      {
        name: 'Crowley',
        stat: {
          role: 'sniper',
          reaction: 0.358,
          accuracy: 0.534,
          sprayControl: 0.881,
          flicksControl: 0.512,
          nades: 0.572,
          aggression: 0.868,
          tactics: 0.617,
          stamina: 0.826,
        },
      },
      {
        name: 'Right',
        stat: {
          role: 'support',
          reaction: 0.352,
          accuracy: 0.353,
          sprayControl: 0.425,
          flicksControl: 0.759,
          nades: 0.332,
          aggression: 0.552,
          tactics: 0.557,
          stamina: 0.638,
        },
      },
    ],
  },
  {
    name: 'Moon',
    players: [
      {
        name: 'Bad',
        stat: {
          role: 'capitan',
          reaction: 0.281,
          accuracy: 0.685,
          sprayControl: 0.871,
          flicksControl: 0.31,
          nades: 0.752,
          aggression: 0.423,
          tactics: 0.469,
          stamina: 0.476,
        },
      },
      {
        name: 'Phantom',
        stat: {
          role: 'rifler',
          reaction: 0.451,
          accuracy: 0.692,
          sprayControl: 0.596,
          flicksControl: 0.595,
          nades: 0.541,
          aggression: 0.315,
          tactics: 0.47,
          stamina: 0.752,
        },
      },
      {
        name: 'Titan',
        stat: {
          role: 'rifler',
          reaction: 0.466,
          accuracy: 0.576,
          sprayControl: 0.777,
          flicksControl: 0.781,
          nades: 0.566,
          aggression: 0.846,
          tactics: 0.64,
          stamina: 0.401,
        },
      },
      {
        name: 'Swan',
        stat: {
          role: 'sniper',
          reaction: 0.258,
          accuracy: 0.455,
          sprayControl: 0.759,
          flicksControl: 0.772,
          nades: 0.377,
          aggression: 0.664,
          tactics: 0.669,
          stamina: 0.833,
        },
      },
      {
        name: 'Tenor',
        stat: {
          role: 'support',
          reaction: 0.48,
          accuracy: 0.794,
          sprayControl: 0.89,
          flicksControl: 0.532,
          nades: 0.338,
          aggression: 0.517,
          tactics: 0.304,
          stamina: 0.448,
        },
      },
    ],
  },
  {
    name: 'Youth',
    players: [
      {
        name: '1Lery',
        stat: {
          role: 'capitan',
          reaction: 0.462,
          accuracy: 0.685,
          sprayControl: 0.335,
          flicksControl: 0.602,
          nades: 0.406,
          aggression: 0.318,
          tactics: 0.843,
          stamina: 0.536,
        },
      },
      {
        name: 'Wong',
        stat: {
          role: 'rifler',
          reaction: 0.399,
          accuracy: 0.728,
          sprayControl: 0.698,
          flicksControl: 0.841,
          nades: 0.596,
          aggression: 0.755,
          tactics: 0.771,
          stamina: 0.389,
        },
      },
      {
        name: 'Melon',
        stat: {
          role: 'rifler',
          reaction: 0.297,
          accuracy: 0.765,
          sprayControl: 0.442,
          flicksControl: 0.454,
          nades: 0.353,
          aggression: 0.745,
          tactics: 0.435,
          stamina: 0.457,
        },
      },
      {
        name: 'Forest',
        stat: {
          role: 'sniper',
          reaction: 0.488,
          accuracy: 0.426,
          sprayControl: 0.44,
          flicksControl: 0.584,
          nades: 0.372,
          aggression: 0.384,
          tactics: 0.424,
          stamina: 0.386,
        },
      },
      {
        name: 'LoseIt',
        stat: {
          role: 'support',
          reaction: 0.39,
          accuracy: 0.721,
          sprayControl: 0.655,
          flicksControl: 0.342,
          nades: 0.607,
          aggression: 0.894,
          tactics: 0.877,
          stamina: 0.688,
        },
      },
    ],
  },
  {
    name: 'Canoe',
    players: [
      {
        name: 'Rosh',
        stat: {
          role: 'capitan',
          reaction: 0.365,
          accuracy: 0.622,
          sprayControl: 0.876,
          flicksControl: 0.374,
          nades: 0.637,
          aggression: 0.785,
          tactics: 0.639,
          stamina: 0.539,
        },
      },
      {
        name: 'Chellen',
        stat: {
          role: 'rifler',
          reaction: 0.21,
          accuracy: 0.345,
          sprayControl: 0.854,
          flicksControl: 0.603,
          nades: 0.603,
          aggression: 0.628,
          tactics: 0.579,
          stamina: 0.502,
        },
      },
      {
        name: 'Chin',
        stat: {
          role: 'rifler',
          reaction: 0.416,
          accuracy: 0.457,
          sprayControl: 0.793,
          flicksControl: 0.419,
          nades: 0.575,
          aggression: 0.549,
          tactics: 0.847,
          stamina: 0.489,
        },
      },
      {
        name: 'Tatam',
        stat: {
          role: 'sniper',
          reaction: 0.408,
          accuracy: 0.67,
          sprayControl: 0.451,
          flicksControl: 0.475,
          nades: 0.535,
          aggression: 0.675,
          tactics: 0.595,
          stamina: 0.819,
        },
      },
      {
        name: 'Aziraphale',
        stat: {
          role: 'support',
          reaction: 0.303,
          accuracy: 0.702,
          sprayControl: 0.374,
          flicksControl: 0.55,
          nades: 0.671,
          aggression: 0.899,
          tactics: 0.811,
          stamina: 0.866,
        },
      },
    ],
  },
  {
    name: 'Sempra',
    players: [
      {
        name: 'FGod',
        stat: {
          role: 'capitan',
          reaction: 0.357,
          accuracy: 0.331,
          sprayControl: 0.843,
          flicksControl: 0.897,
          nades: 0.786,
          aggression: 0.494,
          tactics: 0.9,
          stamina: 0.715,
        },
      },
      {
        name: 'Cicada',
        stat: {
          role: 'rifler',
          reaction: 0.472,
          accuracy: 0.521,
          sprayControl: 0.787,
          flicksControl: 0.401,
          nades: 0.617,
          aggression: 0.693,
          tactics: 0.399,
          stamina: 0.378,
        },
      },
      {
        name: 'Stoic',
        stat: {
          role: 'rifler',
          reaction: 0.412,
          accuracy: 0.34,
          sprayControl: 0.812,
          flicksControl: 0.864,
          nades: 0.778,
          aggression: 0.723,
          tactics: 0.552,
          stamina: 0.705,
        },
      },
      {
        name: 'Somewhere',
        stat: {
          role: 'sniper',
          reaction: 0.492,
          accuracy: 0.587,
          sprayControl: 0.709,
          flicksControl: 0.533,
          nades: 0.625,
          aggression: 0.803,
          tactics: 0.441,
          stamina: 0.54,
        },
      },
      {
        name: 'Tabar',
        stat: {
          role: 'support',
          reaction: 0.329,
          accuracy: 0.434,
          sprayControl: 0.459,
          flicksControl: 0.59,
          nades: 0.611,
          aggression: 0.324,
          tactics: 0.764,
          stamina: 0.427,
        },
      },
    ],
  },
  {
    name: 'Solid',
    players: [
      {
        name: 'Omega',
        stat: {
          role: 'capitan',
          reaction: 0.382,
          accuracy: 0.895,
          sprayControl: 0.368,
          flicksControl: 0.331,
          nades: 0.516,
          aggression: 0.798,
          tactics: 0.9,
          stamina: 0.342,
        },
      },
      {
        name: 'Timely',
        stat: {
          role: 'rifler',
          reaction: 0.374,
          accuracy: 0.442,
          sprayControl: 0.433,
          flicksControl: 0.656,
          nades: 0.769,
          aggression: 0.709,
          tactics: 0.327,
          stamina: 0.745,
        },
      },
      {
        name: 'Rock',
        stat: {
          role: 'rifler',
          reaction: 0.485,
          accuracy: 0.861,
          sprayControl: 0.392,
          flicksControl: 0.511,
          nades: 0.314,
          aggression: 0.731,
          tactics: 0.856,
          stamina: 0.85,
        },
      },
      {
        name: 'Sound',
        stat: {
          role: 'sniper',
          reaction: 0.258,
          accuracy: 0.727,
          sprayControl: 0.494,
          flicksControl: 0.385,
          nades: 0.572,
          aggression: 0.704,
          tactics: 0.881,
          stamina: 0.593,
        },
      },
      {
        name: 'Firemane',
        stat: {
          role: 'support',
          reaction: 0.476,
          accuracy: 0.824,
          sprayControl: 0.786,
          flicksControl: 0.479,
          nades: 0.801,
          aggression: 0.36,
          tactics: 0.673,
          stamina: 0.443,
        },
      },
    ],
  },
  {
    name: 'Island',
    players: [
      {
        name: 'Peace',
        stat: {
          role: 'capitan',
          reaction: 0.438,
          accuracy: 0.774,
          sprayControl: 0.834,
          flicksControl: 0.764,
          nades: 0.88,
          aggression: 0.809,
          tactics: 0.833,
          stamina: 0.671,
        },
      },
      {
        name: 'Chicago',
        stat: {
          role: 'rifler',
          reaction: 0.314,
          accuracy: 0.443,
          sprayControl: 0.657,
          flicksControl: 0.642,
          nades: 0.318,
          aggression: 0.504,
          tactics: 0.447,
          stamina: 0.785,
        },
      },
      {
        name: 'Percent',
        stat: {
          role: 'rifler',
          reaction: 0.491,
          accuracy: 0.571,
          sprayControl: 0.439,
          flicksControl: 0.683,
          nades: 0.698,
          aggression: 0.65,
          tactics: 0.896,
          stamina: 0.711,
        },
      },
      {
        name: 'Invisible',
        stat: {
          role: 'sniper',
          reaction: 0.214,
          accuracy: 0.561,
          sprayControl: 0.492,
          flicksControl: 0.821,
          nades: 0.388,
          aggression: 0.371,
          tactics: 0.622,
          stamina: 0.542,
        },
      },
      {
        name: 'Ouroboros',
        stat: {
          role: 'support',
          reaction: 0.319,
          accuracy: 0.496,
          sprayControl: 0.892,
          flicksControl: 0.481,
          nades: 0.517,
          aggression: 0.376,
          tactics: 0.439,
          stamina: 0.66,
        },
      },
    ],
  },
  {
    name: 'Kadagan',
    players: [
      {
        name: 'Uppper',
        stat: {
          role: 'capitan',
          reaction: 0.338,
          accuracy: 0.821,
          sprayControl: 0.348,
          flicksControl: 0.542,
          nades: 0.467,
          aggression: 0.638,
          tactics: 0.371,
          stamina: 0.383,
        },
      },
      {
        name: 'SuperFrag',
        stat: {
          role: 'rifler',
          reaction: 0.279,
          accuracy: 0.835,
          sprayControl: 0.324,
          flicksControl: 0.587,
          nades: 0.446,
          aggression: 0.645,
          tactics: 0.651,
          stamina: 0.325,
        },
      },
      {
        name: 'Catcher',
        stat: {
          role: 'rifler',
          reaction: 0.323,
          accuracy: 0.35,
          sprayControl: 0.861,
          flicksControl: 0.616,
          nades: 0.71,
          aggression: 0.566,
          tactics: 0.695,
          stamina: 0.791,
        },
      },
      {
        name: 'Kipito',
        stat: {
          role: 'sniper',
          reaction: 0.292,
          accuracy: 0.34,
          sprayControl: 0.529,
          flicksControl: 0.373,
          nades: 0.453,
          aggression: 0.533,
          tactics: 0.64,
          stamina: 0.783,
        },
      },
      {
        name: 'Salute',
        stat: {
          role: 'support',
          reaction: 0.332,
          accuracy: 0.658,
          sprayControl: 0.376,
          flicksControl: 0.686,
          nades: 0.492,
          aggression: 0.8,
          tactics: 0.33,
          stamina: 0.645,
        },
      },
    ],
  },
  {
    name: 'Jupiter',
    players: [
      {
        name: 'Leon',
        stat: {
          role: 'capitan',
          reaction: 0.355,
          accuracy: 0.627,
          sprayControl: 0.743,
          flicksControl: 0.752,
          nades: 0.843,
          aggression: 0.744,
          tactics: 0.56,
          stamina: 0.742,
        },
      },
      {
        name: 'Kosus',
        stat: {
          role: 'rifler',
          reaction: 0.213,
          accuracy: 0.785,
          sprayControl: 0.597,
          flicksControl: 0.355,
          nades: 0.704,
          aggression: 0.847,
          tactics: 0.766,
          stamina: 0.41,
        },
      },
      {
        name: 'TheOwl',
        stat: {
          role: 'rifler',
          reaction: 0.221,
          accuracy: 0.699,
          sprayControl: 0.892,
          flicksControl: 0.657,
          nades: 0.594,
          aggression: 0.806,
          tactics: 0.48,
          stamina: 0.633,
        },
      },
      {
        name: 'Mandarin',
        stat: {
          role: 'sniper',
          reaction: 0.431,
          accuracy: 0.541,
          sprayControl: 0.661,
          flicksControl: 0.648,
          nades: 0.66,
          aggression: 0.717,
          tactics: 0.696,
          stamina: 0.802,
        },
      },
      {
        name: 'Raven',
        stat: {
          role: 'support',
          reaction: 0.359,
          accuracy: 0.588,
          sprayControl: 0.346,
          flicksControl: 0.492,
          nades: 0.313,
          aggression: 0.687,
          tactics: 0.73,
          stamina: 0.599,
        },
      },
    ],
  },
]

export default teamsDefault
