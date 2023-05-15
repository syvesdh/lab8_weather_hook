import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import { getMoodIcon } from 'utilities/weather.js';
import {
    createPost,
    input,
    inputDanger,
    toggleMood,
    setMoodToggle,
    selectMood
} from 'states/post-actions.js';

import './PostForm.css';

function PostForm (props){
    const dispatch = useDispatch();
    const inputEl = useRef(null);
    const inputDangerClass = inputDanger ? 'has-danger' : ''

    const {inputValue, mood, moodToggle} = useSelector((state) => state.postForm);

    const handleMoodToggle = () => {
        setMoodToggle(!moodToggle)
        dispatch(toggleMood())
    }

    const handleInputChange = (e) => {
        dispatch(input(e.target.value))
        if(e.target.value && inputDanger) {
            dispatch(inputDanger(false))
        }
    }

    const handlePost = () => {
        if(mood === 'na') {
            dispatch(setMoodToggle(true))
            return;
        }
        if(!inputValue) {
            dispatch(inputDanger(true));
            return;
        }

        dispatch(createPost(mood, inputValue));
        dispatch(input(''));
        dispatch(selectMood('na'))
    }

    const handleDropdownSelect = (mood) => {
        dispatch(selectMood(mood))
    }

    // TODO

    return (
        <div className="post-form">
            <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDangerClass}`}>
                <div className='mood align-self-start'>
                    <ButtonDropdown type='buttom' isOpen={moodToggle} toggle={handleMoodToggle}>
                        <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                            <i className={getMoodIcon(mood)}></i>&nbsp;{
                                mood === 'na' ? 'Mood' : mood
                            }
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Clear')}><i className={getMoodIcon('Clear')}></i>&nbsp;&nbsp;Clear</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Clouds')}><i className={getMoodIcon('Clouds')}></i>&nbsp;&nbsp;Clouds</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Drizzle')}><i className={getMoodIcon('Drizzle')}></i>&nbsp;&nbsp;Drizzle</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Rain')}><i className={getMoodIcon('Rain')}></i>&nbsp;&nbsp;Rain</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Thunder')}><i className={getMoodIcon('Thunder')}></i>&nbsp;&nbsp;Thunder</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Snow')}><i className={getMoodIcon('Snow')}></i>&nbsp;&nbsp;Snow</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Windy')}><i className={getMoodIcon('Windy')}></i>&nbsp;&nbsp;Windy</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
                <Input className='input' type='textarea' innerRef={inputEl} value={inputValue} onChange={handleInputChange} placeholder="What's on your mind?"></Input>
                <Button className='btn-post align-self-end' color="info" onClick={handlePost}>Post</Button>
            </Alert>
        </div>
    );
};

PostForm.propTypes = {
    inputValue: PropTypes.string,
    inputDanger: PropTypes.bool,
    moodToggle: PropTypes.bool,
    mood: PropTypes.string,
    dispatch: PropTypes.func,
};

export default connect((state) => {
    // TODO
    return {
        ...state.postForm
    }
})(PostForm);