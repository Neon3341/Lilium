// BrowserView.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const { ipcRenderer } = window.electron || {};

const BrowserView = ({ activeTab, tabs }) => {
    useEffect(() => {
        if (ipcRenderer && activeTab >= 0 && tabs[activeTab]) {
            ipcRenderer.send('switch-tab', activeTab);
        }
    }, [activeTab, tabs]);

    return (
        <div className="browser-view">
            {tabs.length === 0 && (
                <div className="empty-state">No tabs open. Click "+" to create a new tab.</div>
            )}
        </div>
    );
};

BrowserView.propTypes = {
    activeTab: PropTypes.number.isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            url: PropTypes.string,
        })
    ).isRequired,
};

export default BrowserView;
