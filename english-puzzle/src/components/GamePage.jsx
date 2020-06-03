import React, { useMemo, useState, useEffect } from 'react';
import api from '../api';
import Checkbox from './Checkbox';
import DropDown from './DropDown';
import GameBox from './GameBox';
import Button from './Button';

const maxLevel = 5;
const maxOption = 59;

const GamePage = () => {
    const [level, setLevel] = useState(0);
    const [option, setOption] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const levelOptions = useMemo(
        () =>
            Array.from({ length: maxLevel }, (v, i) => ({
                value: i,
                text: (i + 1).toString(),
            })),
        []
    );
    const optionOptions = useMemo(
        () =>
            Array.from({ length: maxOption }, (v, i) => ({
                value: i,
                text: (i + 1).toString(),
            })),
        []
    );
    const handleLevelChange = (event) => setLevel(event.target.value);
    const handleOptionChange = (event) => setOption(event.target.value);

    useEffect(() => {
        setLoading(true);
        api.getSentences(level, option)
            .then(setData)
            .then(() => setLoading(false));
    }, [level, option]);

    const handleCheckboxChecked = () => {};

    return (
        <div className="game-page">
            <div className="container">
                <div className="header">
                    <div className="header__drop-downs">
                        <DropDown
                            name="level"
                            label="Level"
                            value={level}
                            options={levelOptions}
                            onChange={handleLevelChange}
                        />
                        <DropDown
                            name="page"
                            label="Page"
                            value={option}
                            options={optionOptions}
                            onChange={handleOptionChange}
                        />
                    </div>
                    <div className="header__checkboxes">
                        <Checkbox
                            className="material-icons control"
                            id="music_note"
                            text="music_note"
                            checked
                            onChange={handleCheckboxChecked}
                        />
                        <Checkbox
                            className="material-icons control"
                            id="volume_up"
                            text="volume_up"
                            checked
                            onChange={handleCheckboxChecked}
                        />
                        <Checkbox
                            className="material-icons control"
                            id="insert_photo"
                            text="insert_photo"
                            checked
                            onChange={handleCheckboxChecked}
                        />
                        <Checkbox
                            className="material-icons control"
                            id="translate"
                            text="translate"
                            checked
                            onChange={handleCheckboxChecked}
                        />
                    </div>
                </div>
                <div className="main game">
                    <div className="game__translation">
                        <i className="material-icons">volume_up</i>
                        <div className="translation">hjhklk</div>
                    </div>
                    {loading ? 'loading' : <GameBox data={data} />}
                    <div className="game__buttons">
                        <Button className="not-know" text="I don't know" />
                        <Button className="check" text="Check" />
                    </div>
                </div>
            </div>
        </div>
    );
};

GamePage.propTypes = {};

export default GamePage;
