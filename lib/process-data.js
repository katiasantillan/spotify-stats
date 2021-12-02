import StreamingHistory1 from "../data/StreamingHistory0.json";
import StreamingHistory2 from "../data/StreamingHistory1.json";

const sortData = (obj) => {
    return Object.entries(obj).sort((a,b) => b[1]-a[1]);
}

export const processData = () => {

    const filteredSongs1 = StreamingHistory1.filter(record => record.endTime.slice(0,4) === '2021');
    const filteredSongs2 = StreamingHistory2.filter(record => record.endTime.slice(0,4) === '2021');

    const filteredSongs = filteredSongs1.concat(filteredSongs2);

    const occurrencesArtist = {};
    const occurrencesTrack = {};

    for (var i = 0; i < filteredSongs.length; i++) {
      let { artistName, trackName } = filteredSongs[i];

      occurrencesArtist[artistName] = (occurrencesArtist[artistName] || 0 ) + 1;
      occurrencesTrack[trackName] = (occurrencesTrack[trackName] || 0 ) + 1;
    }

    const orderedArtists = sortData(occurrencesArtist).slice(0,10);
    const orderedTracks = sortData(occurrencesTrack).slice(0,10);

    orderedArtists.unshift(['Artist', 'Times listened'])
    orderedTracks.unshift(['Song', 'Times played'])

    return {
        artistsData: orderedArtists,
        tracksData: orderedTracks,
    };
}