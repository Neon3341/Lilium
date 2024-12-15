import React, { useState } from 'react';

const Tabs = ({ onSelectTab, onCloseTab, tabs }) => {
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
                    {tab.title}
                    <button onClick={(e) => handleTabClose(index, e)}>x</button>
                </div>
            ))}
            <button onClick={() => onSelectTab(-1)}>+</button>
        </div>
    );
};

export default Tabs;
