// this is the object array , 2d array

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

// kailangan nato sha e flat pero make sure nga ang input is array
const flattenPlaylists = arr => {
  if(!Array.isArray(arr)) {
    return [];
  } 

  // diri iinsert ang per objects
  let flattenArray = [];

  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
    // buhatan nato shag source property with values i = sa 2d array index then j ang index ato na object
    arr[i][j].source = [i,j];
    // push nato kada object sa flatten array
    flattenArray.push(arr[i][j]);
    }
  }

  return flattenArray;
}

// ma flat ang playlist array ani mahimo na shang array of object clean version
let flattenArray = flattenPlaylists(playlists);

// console.log(flattenArray);

// ang ideya ani is buhatan nato og scoretrack ang obj pero ang input ani is katong na flat na nga array
const scoreTracks = obj => {
  for(let i = 0; i < obj.length; i++) {
    obj[i].score = obj[i].votes * 10 - Math.abs(obj[i].bpm - 120);
  }
  return obj;
}

// console.log(scoreTracks(flattenArray));

let scoreTrack = scoreTracks(flattenArray);


// ang ideya ani is e keep lang nato tong mga tracks nga walay duplicate
const dedupeTracks = obj => {
  let dedupeArray = [];
  let trackIdArray = [];

  for(let i = 0; i < obj.length; i++) {
    // check if wala pa nag exist sa trackId array ang trackId per object , if wala pa, push sa dedupeArray which is ang final list
    // then push sab sa trackId array
    if(trackIdArray.includes(obj[i].trackId) == false){
      trackIdArray.push(obj[i].trackId);
      dedupeArray.push(obj[i]);
    }
  }
  return dedupeArray;
}


let dedupeTrack = dedupeTracks(scoreTrack);

// console.log(dedupeTrack);


// ang ideya ani is makuan nato ang quota na muplay ang music per artist
const enforceArtistQuota = (obj, maxPerArtist) => {
  // kailangan nato ni para e store ang artist name
  let artist = {};

  // diri ang object na katong within range lang sa maximum value
  let newObjArray = [];

  // loop ta every object
  for(let i = 0; i < obj.length; i++) {
    // create tag current object
    let currentArtist = obj[i].artist;

    // if katong currentObject is wala pa nag exist sa artis object, ibutang nato sha tas butangan og default value nga 1
    if(artist[currentArtist] == undefined) {
      artist[currentArtist] = 1;
      
    }
    // dungagan ang value if naa na sha daan
    else {
      artist[currentArtist]++;
    }

    // if within range pa sha, e push lang
    if (artist[currentArtist] <= maxPerArtist) {
      newObjArray.push(obj[i]);
    }
  }


  return newObjArray;
}

let enforcedArtistQuota = enforceArtistQuota(dedupeTrack);



// ang ideya ani is mabutangan nato og schedule per music kung unsa na sila na slot
const buildSchedule = obj => {
  let scheduleArray = [];
  

  // loop ta every object
  for(let i = 0; i < obj.length; i++) {
    // kada object, buhat tag schedule na object diha nato ibutang ang slot nila pero dapat 1 ang value
    // tapos ang trackId

    let schedule = {};
    schedule.slot = i + 1;
    schedule.trackId = obj[i].trackId;

    // then push
    scheduleArray.push(schedule);
  }

  return scheduleArray;
}


let builtSchedule = buildSchedule(enforcedArtistQuota);

// diri na tong polished na nga object makuan nato ang order sa music
const remixPlaylist = (obj, maximum) => {
  // e flat nato pero ang input is katong playlists mamaya and so on..
  let flattenArray = flattenPlaylists(obj);
  let scoreTrack = scoreTracks(flattenArray);
  let dedupeTrack = dedupeTracks(scoreTrack);
  let enforcedArtistQuota = enforceArtistQuota(dedupeTrack , maximum)
  let builtSchedule = buildSchedule(enforcedArtistQuota);

  return builtSchedule;
}


console.log(remixPlaylist(playlists, 2))