const playlists = [
  [
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122
    },
    {
      trackId: "trk102",
      artist: "Neon Harbor",
      title: "Static Horizon",
      votes: 2,
      bpm: 108
    },
    {
      trackId: "trk103",
      artist: "Lunar Arcade",
      title: "Midnight Frequency",
      votes: 4,
      bpm: 128
    }
  ],
  [
    {
      trackId: "trk201",
      artist: "Solar Echo",
      title: "Glass Skyline",
      votes: 3,
      bpm: 115
    },
    {
      trackId: "trk202",
      artist: "Velvet Comet",
      title: "Satellite Hearts",
      votes: 6,
      bpm: 124
    }
  ]
];

const flattenPlaylists = arr => {
  if(!Array.isArray(arr)) {
    return [];
  } 

  let flattenArray = [];

  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
    arr[i][j].source = [i,j];
    flattenArray.push(arr[i][j]);
    }
  }

  return flattenArray;
}

let flattenArray = flattenPlaylists(playlists);

// console.log(flattenArray);

const scoreTracks = obj => {
  for(let i = 0; i < obj.length; i++) {
    obj[i].score = obj[i].votes * 10 - Math.abs(obj[i].bpm - 120);
  }
  return obj;
}

// console.log(scoreTracks(flattenArray));

let scoreTrack = scoreTracks(flattenArray);



const dedupeTracks = obj => {
  let dedupeArray = [];
  let trackIdArray = [];

  for(let i = 0; i < obj.length; i++) {
    if(trackIdArray.includes(obj[i].trackId) == false){
      trackIdArray.push(obj[i].trackId);
      dedupeArray.push(obj[i]);
    }
  }
  return dedupeArray;
}


let dedupeTrack = dedupeTracks(scoreTrack);

console.log(dedupeTrack);


