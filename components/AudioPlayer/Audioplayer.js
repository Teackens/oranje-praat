import SpotifyPlayer from 'react-spotify-player';

// size may also be a plain string using the presets 'large' or 'compact'
const size = {
    width: '100%',
    height: 152,
};
const view = 'coverart';
const theme = 'black';

export const AudioPlayer = ({ uri }) => {
    return (
        <div className="rounded-lg">
            <SpotifyPlayer uri={uri} size={size} theme={theme} view={view} />
        </div>
    );
};
