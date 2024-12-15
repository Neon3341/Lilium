// Tab.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ tabs, onSelectTab, onCloseTab, onNewTab }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
        onSelectTab(index);
    };

    const handleTabClose = (index, event) => {
        event.stopPropagation();
        onCloseTab(index);
        if (index === activeTab && tabs.length > 1) {
            setActiveTab(index === 0 ? 0 : index - 1);
        }
    };

    return (
        <div className="tabs">
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={`tab ${index === activeTab ? 'active' : ''}`}
                    onClick={() => handleTabClick(index)}
                >
                    {tab.title || 'New Tab'}
                    <button
                        className="close-button"
                        onClick={(e) => handleTabClose(index, e)}
                    >
                        ×
                    </button>
                </div>
            ))}
            <button className="new-tab-button" onClick={onNewTab}>
                +
            </button>
        </div>
    );
};

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            url: PropTypes.string,
        })
    ).isRequired,
    onSelectTab: PropTypes.func.isRequired,
    onCloseTab: PropTypes.func.isRequired,
    onNewTab: PropTypes.func.isRequired,
};

export default Tabs;