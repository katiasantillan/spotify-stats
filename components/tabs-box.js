import { useContext, useState, Children, cloneElement } from "react"
import { ACTION_TYPES, topContext } from "../store/store-context"

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch';

import styles from './tabs-box.module.css';


const TabsBox = ({ section, children }) => {
    const { dispatch, state } = useContext(topContext);
    const { topArtists, topSongs, sortTimeArtists, sortTimeSongs } = state;
    const [defaultTop, setDefaultTop] = useState("10");
    const [defaultSwitch, setDefaultSwitch] = useState(false);

    const handleChangeSwitch = (event) => {
      if(section == "artists"){
            dispatch({
                type: ACTION_TYPES.SET_SORT_TIME_ARTISTS,
                payload: { sortTimeArtists: event.target.checked }
            })
        }else if(section == "songs"){
            dispatch({
                type: ACTION_TYPES.SET_SORT_TIME_SONGS,
                payload: { sortTimeSongs: event.target.checked }
            })
        }else {
            setDefaultSwitch(event.target.checked);
        }
    };

    const handleChange = (ev, newValue) => {
        if(section == "artists"){
            dispatch({
                type: ACTION_TYPES.SET_TOP_ARTISTS,
                payload: { topArtists: newValue }
            })
        }else if(section == "songs"){
            dispatch({
                type: ACTION_TYPES.SET_TOP_SONGS,
                payload: { topSongs: newValue }
            })
        }else {
            setDefaultTop(newValue)
        }
    };

    const getCurrValueTabs = () => {
        if (section == "artists") return topArtists;
        else if (section == "songs") return topSongs;
        else return defaultTop;
    }

    const getCurrValueSwitch = () => {
        if (section == "artists") return sortTimeArtists;
        else if (section == "songs") return sortTimeSongs;
        else return defaultSwitch;
    }

    return (
        <>
            <Box className={styles.boxContainer}>
                <div className={styles.tabsContainer}>
                    <Tabs
                        value={getCurrValueTabs()}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        centered
                    >
                        <Tab value="10" label="Top 10" />
                        <Tab value="50" label="Top 50" />
                        <Tab value="100" label="Top 100" />
                    </Tabs>
                </div>
                <div className={styles.switchContainer}>
                    <Switch
                        checked={getCurrValueSwitch()}
                        onChange={handleChangeSwitch}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="secondary"
                    />
                    <span>Ordenar por tiempo reproducido</span>
                </div>
            </Box>
            { children &&
                <div className={styles.contentContainer}>
                    {
                        Children.map(children, (child) =>
                            cloneElement(child, { top: defaultTop }
                        ))
                    }
                </div>
            }
        </>
    );
};

export default TabsBox;

