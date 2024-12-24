import StreamingHistory1 from "../data/StreamingHistory_music_0.json";
import StreamingHistory2 from "../data/StreamingHistory_music_1.json";

const filterDataByYear = (data, year) => {
    return data.filter(record => record.endTime.slice(0,4) === year.toString());
}

const sortProcessedData = (data, pos, byTime=0) => {
    const sortedEntries = Object.entries(data).sort((a,b) => b[1][pos+byTime]-a[1][pos+byTime]);
    return sortedEntries;
}

const sortData = (obj) => {
    return Object.entries(obj).sort((a,b) => b[1]-a[1]);
}

const sortSongsPerArtist = (artistsData) => {

    const orderedArtistsData = new Map();
    artistsData = artistsData.slice(0,100);

    artistsData.map(artist => {
        orderedArtistsData.set(artist[0], [sortData(artist[1][0]),artist[1][1],artist[1][2]])
    })

    return orderedArtistsData;
}

const createDataObjects = (data) => {

    const artistsData = {};
    const songsData = {};

    const songsOccurrences = {}
    const artistsOccurrences = {}

    for (let i = 0; i < data.length; i++) {
        let { artistName, trackName, msPlayed } = data[i];

        //Counting occurrences (data for Google Charts)
        songsOccurrences[trackName] = (songsOccurrences[trackName]  || 0 ) + 1;
        artistsOccurrences[artistName] = (artistsOccurrences[artistName] || 0 ) + 1;

        // Adding information to artistsData [songsInfo, timesPlayed, timeReproduced]
        if(artistsData[artistName]) {
            artistsData[artistName][0][trackName] = (artistsData[artistName][0][trackName] || 0 ) + 1;
            artistsData[artistName][1] += 1;
            artistsData[artistName][2] += msPlayed;
        } else {
            artistsData[artistName] = [{}, 1, msPlayed]
        }

        // Adding information to songsData [timesPlayed, timeReproduced, artistName]
        if(songsData[trackName]) {
            songsData[trackName][0] += 1
            songsData[trackName][1] += msPlayed
        } else {
            songsData[trackName] = [1, msPlayed, artistName]
        }
    }

    return {
        artistsData,
        songsData,
        songsOccurrences,
        artistsOccurrences
    }
}


export const trimDataMap = (data, top = 10) => {
    return Array.from(data).slice(0,top);
};

export const trimDataArray = (data, top = 10) => {
    return data.slice(0,top);
};

export const processData = (year = 2024) => {

    // Filter json records by year and concatenate data files
    const filteredSongs1 = filterDataByYear(StreamingHistory1,year);
    const filteredSongs2 = filterDataByYear(StreamingHistory2,year);
    const filteredSongs = filteredSongs1.concat(filteredSongs2);

    // Create processed data objects by the filtered data file
    const { artistsData, songsData, songsOccurrences, artistsOccurrences }
        = createDataObjects(filteredSongs);

    // Order data from most to least listened
    const sortedArtists = sortProcessedData(artistsData,1);
    const sortedSongs = sortProcessedData(songsData,0);
    const sortedSongsOccurrences = sortData(songsOccurrences);
    const sortedArtistsOccurrences = sortData(artistsOccurrences);

    // Order data by time listened
    const sortedArtistsByTime = sortProcessedData(artistsData,1,1);
    const sortedSongsByTime = sortProcessedData(songsData,0,1);

    // Order songs by artist
    const orderedSongsByArtists = sortSongsPerArtist(sortedArtists);
    const orderedSongsByArtistsByTime = sortSongsPerArtist(sortedArtistsByTime);

    //Add headers to ordered data to use in Google charts
    sortedSongsOccurrences.unshift(['Artist', 'Times listened']);
    sortedArtistsOccurrences.unshift(['Song', 'Times played']);

    return {
        artists: sortedArtistsOccurrences,
        tracks: sortedSongsOccurrences,
        artistsData: orderedSongsByArtists,
        songsData: sortedSongs,
        artistsDataByTime: orderedSongsByArtistsByTime,
        songsDataByTime: sortedSongsByTime,
    };
}