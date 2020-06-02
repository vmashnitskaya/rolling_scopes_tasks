import React, { useMemo, useState } from 'react';
import Checkbox from './Checkbox';
import DropDown from './DropDown';
import GameBox from './GameBox';
import Button from './Button';

const maxLevel = 6;
const maxPage = 30;

const GamePage = () => {
    const [level, setLevel] = useState('1');
    const [page, setPage] = useState('1');
    const levelOptions = useMemo(
        () =>
            Array.from({ length: maxLevel }, (v, i) => {
                const l = (i + 1).toString();
                return {
                    value: l,
                    text: l,
                };
            }),
        []
    );
    const pageOptions = useMemo(
        () =>
            Array.from({ length: maxPage }, (v, i) => {
                const p = (i + 1).toString();
                return {
                    value: p,
                    text: p,
                };
            }),
        []
    );
    const handleLevelChange = (event) => setLevel(event.target.value);
    const handlePageChange = (event) => setPage(event.target.value);
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
                            value={page}
                            options={pageOptions}
                            onChange={handlePageChange}
                        />
                    </div>
                    <div className="header__checkboxes">
                        <Checkbox
                            className="material-icons control"
                            id="music_note"
                            text="music_note"
                            checked="true"
                        />
                        <Checkbox
                            className="material-icons control"
                            id="volume_up"
                            text="volume_up"
                            checked="true"
                        />
                        <Checkbox
                            className="material-icons control"
                            id="insert_photo"
                            text="insert_photo"
                            checked="true"
                        />
                        <Checkbox
                            className="material-icons control"
                            id="translate"
                            text="translate"
                            checked="true"
                        />
                    </div>
                </div>
                <div className="main game">
                    <div className="game__translation">
                        <i className="material-icons">volume_up</i>
                        <div className="translation">hjhklk</div>
                    </div>
                    <GameBox className="game__box" />
                    <div className="game__guess-area" />
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
