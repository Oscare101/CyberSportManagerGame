import { Team } from './interfaces'

const teamsDefault: Team[] = [
  {
    name: 'NOVA',
    players: [
      {
        name: 'Oscare',
        stat: {
          role: 'sniper',
          reaction: 0.292,
          accuracy: 0.742,
          sprayControl: 0.828,
          flicksControl: 0.618,
        },
      },
      {
        name: 'Header',
        stat: {
          role: 'rifler',
          reaction: 0.211,
          accuracy: 0.704,
          sprayControl: 0.555,
          flicksControl: 0.767,
        },
      },
      {
        name: 'Modest',
        stat: {
          role: 'capitan',
          reaction: 0.209,
          accuracy: 0.555,
          sprayControl: 0.521,
          flicksControl: 0.828,
        },
      },
      {
        name: 'Olaph',
        stat: {
          role: 'rifler',
          reaction: 0.24,
          accuracy: 0.773,
          sprayControl: 0.577,
          flicksControl: 0.76,
        },
      },
      {
        name: 'Roller',
        stat: {
          role: 'capitan',
          reaction: 0.214,
          accuracy: 0.873,
          sprayControl: 0.642,
          flicksControl: 0.518,
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
          role: 'sniper',
          reaction: 0.231,
          accuracy: 0.638,
          sprayControl: 0.78,
          flicksControl: 0.864,
        },
      },
      {
        name: 'Nelo',
        stat: {
          role: 'rifler',
          reaction: 0.258,
          accuracy: 0.606,
          sprayControl: 0.786,
          flicksControl: 0.641,
        },
      },
      {
        name: 'Brad',
        stat: {
          role: 'rifler',
          reaction: 0.254,
          accuracy: 0.773,
          sprayControl: 0.808,
          flicksControl: 0.696,
        },
      },
      {
        name: 'Silver',
        stat: {
          role: 'rifler',
          reaction: 0.215,
          accuracy: 0.572,
          sprayControl: 0.788,
          flicksControl: 0.605,
        },
      },
      {
        name: 'Colour',
        stat: {
          role: 'capitan',
          reaction: 0.285,
          accuracy: 0.769,
          sprayControl: 0.797,
          flicksControl: 0.56,
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
          reaction: 0.225,
          accuracy: 0.559,
          sprayControl: 0.536,
          flicksControl: 0.539,
        },
      },
      {
        name: 'Rossander',
        stat: {
          role: 'sniper',
          reaction: 0.298,
          accuracy: 0.605,
          sprayControl: 0.881,
          flicksControl: 0.84,
        },
      },
      {
        name: 'Awesome',
        stat: {
          role: 'rifler',
          reaction: 0.206,
          accuracy: 0.512,
          sprayControl: 0.575,
          flicksControl: 0.604,
        },
      },
      {
        name: 'NBF',
        stat: {
          role: 'rifler',
          reaction: 0.239,
          accuracy: 0.641,
          sprayControl: 0.811,
          flicksControl: 0.547,
        },
      },
      {
        name: 'Scelt',
        stat: {
          role: 'rifler',
          reaction: 0.245,
          accuracy: 0.605,
          sprayControl: 0.533,
          flicksControl: 0.652,
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
          role: 'sniper',
          reaction: 0.233,
          accuracy: 0.502,
          sprayControl: 0.852,
          flicksControl: 0.653,
        },
      },
      {
        name: 'B8Loo',
        stat: {
          role: 'rifler',
          reaction: 0.289,
          accuracy: 0.84,
          sprayControl: 0.772,
          flicksControl: 0.72,
        },
      },
      {
        name: 'Newton',
        stat: {
          role: 'rifler',
          reaction: 0.206,
          accuracy: 0.621,
          sprayControl: 0.824,
          flicksControl: 0.737,
        },
      },
      {
        name: 'Serpe',
        stat: {
          role: 'support',
          reaction: 0.259,
          accuracy: 0.64,
          sprayControl: 0.67,
          flicksControl: 0.617,
        },
      },
      {
        name: 'Lancar',
        stat: {
          role: 'capitan',
          reaction: 0.265,
          accuracy: 0.658,
          sprayControl: 0.517,
          flicksControl: 0.61,
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
          role: 'rifler',
          reaction: 0.201,
          accuracy: 0.589,
          sprayControl: 0.501,
          flicksControl: 0.738,
        },
      },
      {
        name: 'Zoom',
        stat: {
          role: 'rifler',
          reaction: 0.277,
          accuracy: 0.894,
          sprayControl: 0.593,
          flicksControl: 0.866,
        },
      },
      {
        name: 'Smith',
        stat: {
          role: 'capitan',
          reaction: 0.204,
          accuracy: 0.653,
          sprayControl: 0.641,
          flicksControl: 0.639,
        },
      },
      {
        name: 'Focus',
        stat: {
          role: 'sniper',
          reaction: 0.291,
          accuracy: 0.689,
          sprayControl: 0.553,
          flicksControl: 0.705,
        },
      },
      {
        name: 'Invincible',
        stat: {
          role: 'rifler',
          reaction: 0.285,
          accuracy: 0.81,
          sprayControl: 0.702,
          flicksControl: 0.773,
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
          role: 'rifler',
          reaction: 0.248,
          accuracy: 0.545,
          sprayControl: 0.613,
          flicksControl: 0.702,
        },
      },
      {
        name: 'Theater',
        stat: {
          role: 'rifler',
          reaction: 0.258,
          accuracy: 0.767,
          sprayControl: 0.849,
          flicksControl: 0.526,
        },
      },
      {
        name: 'Salivan',
        stat: {
          role: 'capitan',
          reaction: 0.283,
          accuracy: 0.762,
          sprayControl: 0.752,
          flicksControl: 0.724,
        },
      },
      {
        name: 'Faker',
        stat: {
          role: 'sniper',
          reaction: 0.22,
          accuracy: 0.683,
          sprayControl: 0.585,
          flicksControl: 0.754,
        },
      },
      {
        name: 'Boxer',
        stat: {
          role: 'rifler',
          reaction: 0.257,
          accuracy: 0.578,
          sprayControl: 0.863,
          flicksControl: 0.824,
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
          role: 'sniper',
          reaction: 0.233,
          accuracy: 0.593,
          sprayControl: 0.81,
          flicksControl: 0.58,
        },
      },
      {
        name: 'Super',
        stat: {
          role: 'rifler',
          reaction: 0.219,
          accuracy: 0.582,
          sprayControl: 0.637,
          flicksControl: 0.641,
        },
      },
      {
        name: 'Bait',
        stat: {
          role: 'support',
          reaction: 0.201,
          accuracy: 0.793,
          sprayControl: 0.597,
          flicksControl: 0.774,
        },
      },
      {
        name: 'Fury',
        stat: {
          role: 'rifler',
          reaction: 0.203,
          accuracy: 0.543,
          sprayControl: 0.565,
          flicksControl: 0.775,
        },
      },
      {
        name: 'Pretios',
        stat: {
          role: 'capitan',
          reaction: 0.265,
          accuracy: 0.622,
          sprayControl: 0.773,
          flicksControl: 0.787,
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
          role: 'sniper',
          reaction: 0.237,
          accuracy: 0.899,
          sprayControl: 0.767,
          flicksControl: 0.523,
        },
      },
      {
        name: 'Faris',
        stat: {
          role: 'capitan',
          reaction: 0.286,
          accuracy: 0.688,
          sprayControl: 0.511,
          flicksControl: 0.504,
        },
      },
      {
        name: 'Electron',
        stat: {
          role: 'rifler',
          reaction: 0.214,
          accuracy: 0.605,
          sprayControl: 0.699,
          flicksControl: 0.656,
        },
      },
      {
        name: 'Crowley',
        stat: {
          role: 'capitan',
          reaction: 0.273,
          accuracy: 0.783,
          sprayControl: 0.654,
          flicksControl: 0.567,
        },
      },
      {
        name: 'Right',
        stat: {
          role: 'rifler',
          reaction: 0.251,
          accuracy: 0.776,
          sprayControl: 0.798,
          flicksControl: 0.727,
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
          role: 'sniper',
          reaction: 0.255,
          accuracy: 0.71,
          sprayControl: 0.733,
          flicksControl: 0.607,
        },
      },
      {
        name: 'Phantom',
        stat: {
          role: 'rifler',
          reaction: 0.257,
          accuracy: 0.532,
          sprayControl: 0.884,
          flicksControl: 0.794,
        },
      },
      {
        name: 'Titan',
        stat: {
          role: 'capitan',
          reaction: 0.207,
          accuracy: 0.558,
          sprayControl: 0.725,
          flicksControl: 0.824,
        },
      },
      {
        name: 'Swan',
        stat: {
          role: 'rifler',
          reaction: 0.225,
          accuracy: 0.756,
          sprayControl: 0.657,
          flicksControl: 0.558,
        },
      },
      {
        name: 'Tenor',
        stat: {
          role: 'rifler',
          reaction: 0.205,
          accuracy: 0.537,
          sprayControl: 0.78,
          flicksControl: 0.707,
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
          role: 'support',
          reaction: 0.291,
          accuracy: 0.594,
          sprayControl: 0.754,
          flicksControl: 0.611,
        },
      },
      {
        name: 'Wong',
        stat: {
          role: 'sniper',
          reaction: 0.224,
          accuracy: 0.806,
          sprayControl: 0.848,
          flicksControl: 0.707,
        },
      },
      {
        name: 'Melon',
        stat: {
          role: 'support',
          reaction: 0.214,
          accuracy: 0.531,
          sprayControl: 0.783,
          flicksControl: 0.838,
        },
      },
      {
        name: 'Forest',
        stat: {
          role: 'capitan',
          reaction: 0.284,
          accuracy: 0.548,
          sprayControl: 0.799,
          flicksControl: 0.699,
        },
      },
      {
        name: 'LoseIt',
        stat: {
          role: 'rifler',
          reaction: 0.219,
          accuracy: 0.617,
          sprayControl: 0.544,
          flicksControl: 0.59,
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
          role: 'sniper',
          reaction: 0.211,
          accuracy: 0.593,
          sprayControl: 0.757,
          flicksControl: 0.789,
        },
      },
      {
        name: 'Chellen',
        stat: {
          role: 'support',
          reaction: 0.268,
          accuracy: 0.622,
          sprayControl: 0.802,
          flicksControl: 0.717,
        },
      },
      {
        name: 'Chin',
        stat: {
          role: 'capitan',
          reaction: 0.28,
          accuracy: 0.737,
          sprayControl: 0.511,
          flicksControl: 0.553,
        },
      },
      {
        name: 'Tatam',
        stat: {
          role: 'capitan',
          reaction: 0.212,
          accuracy: 0.722,
          sprayControl: 0.553,
          flicksControl: 0.553,
        },
      },
      {
        name: 'Aziraphale',
        stat: {
          role: 'support',
          reaction: 0.21,
          accuracy: 0.618,
          sprayControl: 0.797,
          flicksControl: 0.643,
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
          role: 'sniper',
          reaction: 0.218,
          accuracy: 0.862,
          sprayControl: 0.513,
          flicksControl: 0.682,
        },
      },
      {
        name: 'Cicada',
        stat: {
          role: 'support',
          reaction: 0.265,
          accuracy: 0.885,
          sprayControl: 0.715,
          flicksControl: 0.715,
        },
      },
      {
        name: 'Stoic',
        stat: {
          role: 'support',
          reaction: 0.242,
          accuracy: 0.656,
          sprayControl: 0.8,
          flicksControl: 0.577,
        },
      },
      {
        name: 'Somewhere',
        stat: {
          role: 'rifler',
          reaction: 0.284,
          accuracy: 0.655,
          sprayControl: 0.603,
          flicksControl: 0.61,
        },
      },
      {
        name: 'Tabar',
        stat: {
          role: 'support',
          reaction: 0.248,
          accuracy: 0.682,
          sprayControl: 0.727,
          flicksControl: 0.599,
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
          reaction: 0.245,
          accuracy: 0.741,
          sprayControl: 0.645,
          flicksControl: 0.802,
        },
      },
      {
        name: 'Timely',
        stat: {
          role: 'sniper',
          reaction: 0.249,
          accuracy: 0.816,
          sprayControl: 0.63,
          flicksControl: 0.728,
        },
      },
      {
        name: 'Rock',
        stat: {
          role: 'support',
          reaction: 0.221,
          accuracy: 0.586,
          sprayControl: 0.63,
          flicksControl: 0.764,
        },
      },
      {
        name: 'Sound',
        stat: {
          role: 'support',
          reaction: 0.296,
          accuracy: 0.65,
          sprayControl: 0.691,
          flicksControl: 0.868,
        },
      },
      {
        name: 'Dunk',
        stat: {
          role: 'rifler',
          reaction: 0.21,
          accuracy: 0.853,
          sprayControl: 0.786,
          flicksControl: 0.642,
        },
      },
    ],
  },
  {
    name: 'Island',
    players: [
      {
        name: 'LoseIt',
        stat: {
          role: 'sniper',
          reaction: 0.286,
          accuracy: 0.86,
          sprayControl: 0.523,
          flicksControl: 0.761,
        },
      },
      {
        name: 'Chicago',
        stat: {
          role: 'support',
          reaction: 0.279,
          accuracy: 0.601,
          sprayControl: 0.721,
          flicksControl: 0.737,
        },
      },
      {
        name: 'Percent',
        stat: {
          role: 'support',
          reaction: 0.236,
          accuracy: 0.892,
          sprayControl: 0.674,
          flicksControl: 0.884,
        },
      },
      {
        name: 'Invisible',
        stat: {
          role: 'capitan',
          reaction: 0.29,
          accuracy: 0.614,
          sprayControl: 0.596,
          flicksControl: 0.772,
        },
      },
      {
        name: 'Ouroboros',
        stat: {
          role: 'rifler',
          reaction: 0.202,
          accuracy: 0.717,
          sprayControl: 0.859,
          flicksControl: 0.604,
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
          role: 'sniper',
          reaction: 0.273,
          accuracy: 0.856,
          sprayControl: 0.521,
          flicksControl: 0.574,
        },
      },
      {
        name: 'SuperFrag',
        stat: {
          role: 'support',
          reaction: 0.215,
          accuracy: 0.633,
          sprayControl: 0.82,
          flicksControl: 0.511,
        },
      },
      {
        name: 'Catcher',
        stat: {
          role: 'support',
          reaction: 0.232,
          accuracy: 0.57,
          sprayControl: 0.63,
          flicksControl: 0.649,
        },
      },
      {
        name: 'Kipito',
        stat: {
          role: 'support',
          reaction: 0.204,
          accuracy: 0.641,
          sprayControl: 0.891,
          flicksControl: 0.624,
        },
      },
      {
        name: 'Salute',
        stat: {
          role: 'support',
          reaction: 0.232,
          accuracy: 0.669,
          sprayControl: 0.602,
          flicksControl: 0.789,
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
          role: 'sniper',
          reaction: 0.221,
          accuracy: 0.844,
          sprayControl: 0.874,
          flicksControl: 0.631,
        },
      },
      {
        name: 'Kosus',
        stat: {
          role: 'support',
          reaction: 0.211,
          accuracy: 0.788,
          sprayControl: 0.723,
          flicksControl: 0.651,
        },
      },
      {
        name: 'TheOwl',
        stat: {
          role: 'support',
          reaction: 0.254,
          accuracy: 0.599,
          sprayControl: 0.541,
          flicksControl: 0.732,
        },
      },
      {
        name: 'Mandarin',
        stat: {
          role: 'support',
          reaction: 0.211,
          accuracy: 0.681,
          sprayControl: 0.727,
          flicksControl: 0.547,
        },
      },
      {
        name: 'Raven',
        stat: {
          role: 'rifler',
          reaction: 0.295,
          accuracy: 0.858,
          sprayControl: 0.524,
          flicksControl: 0.823,
        },
      },
    ],
  },
]

export default teamsDefault
